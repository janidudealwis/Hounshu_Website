import React, { useState, useEffect, useRef } from "react";
import styles from "./ProductModal.module.css";

const ProductModal = ({ product, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const modalContentRef = useRef(null);

  // Disable background scroll when modal is open
  useEffect(() => {
    // Store the scroll position
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    // Prevent scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.documentElement.style.paddingRight = "0";
    document.body.style.paddingRight = "0";

    // Prevent scroll events
    const preventScroll = (e) => {
      e.preventDefault();
    };

    const preventDefaultScroll = () => {
      window.scrollTo(scrollX, scrollY);
    };

    // Add multiple event listeners to prevent scrolling
    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("scroll", preventDefaultScroll);

    return () => {
      // Restore scroll
      document.documentElement.style.overflow = "unset";
      document.body.style.overflow = "unset";
      document.documentElement.style.paddingRight = "";
      document.body.style.paddingRight = "";

      // Remove event listeners
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("scroll", preventDefaultScroll);

      // Restore scroll position
      window.scrollTo(scrollX, scrollY);
    };
  }, []);

  // Generate multiple images for the product (in a real app, this would come from product data)
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581092162562-40038f56c232?w=500&q=80&auto=format&fit=crop",
  ];

  // Technical specifications based on product type
  const getSpecifications = () => {
    const baseSpecs = {
      "Engine Model": "Kubota V2203-E2BG",
      "Fuel Tank Capacity": "65 Liters",
      "Fuel Consumption": "4.1 L/h (75% Load)",
      "Sound Level": "63 dB(A) @ 7m",
      "Dry Weight": "590 kg",
      "Dimensions (L×W×H)": "1540 x 700 x 950 mm",
    };
    return baseSpecs;
  };

  const specifications = getSpecifications();

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleWheel = (e) => {
    // Only allow scrolling if the target or parent is the modal content
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      e.preventDefault();
    }
  };

  const handleTouchMove = (e) => {
    // Only allow touch scrolling if the target or parent is the modal content
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      e.preventDefault();
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleBackgroundClick}
      onWheel={handleWheel}
      onTouchMove={handleTouchMove}
    >
      <div className={styles.modalContent} ref={modalContentRef}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <div className={styles.container}>
          {/* Left Side - Images */}
          <div className={styles.imageSection}>
            <div className={styles.mainImageContainer}>
              <img
                src={productImages[selectedImageIndex]}
                alt={product.name}
                className={styles.mainImage}
              />
              {product.status && (
                <span className={styles.statusBadge}>{product.status}</span>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className={styles.thumbnailsContainer}>
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${
                    selectedImageIndex === index ? styles.active : ""
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img src={image} alt={`View ${index + 1}`} />
                </button>
              ))}
            </div>

            {/* Image Navigation */}
            {productImages.length > 1 && (
              <div className={styles.imageNavigation}>
                <button
                  className={styles.navBtn}
                  onClick={() =>
                    setSelectedImageIndex(
                      (prev) =>
                        (prev - 1 + productImages.length) %
                        productImages.length,
                    )
                  }
                >
                  ◀
                </button>
                <button
                  className={styles.navBtn}
                  onClick={() =>
                    setSelectedImageIndex(
                      (prev) => (prev + 1) % productImages.length,
                    )
                  }
                >
                  ▶
                </button>
              </div>
            )}
          </div>

          {/* Right Side - Details */}
          <div className={styles.detailsSection}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
              <span>INDUSTRIAL</span>
              <span className={styles.separator}>/</span>
              <span>GENERATORS</span>
              <span className={styles.separator}>/</span>
              <span className={styles.currentCategory}>
                {product.series.toUpperCase()}
              </span>
            </div>

            {/* Product Name and Description */}
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productDescription}>{product.description}</p>

            {/* Key Specs */}
            <div className={styles.keySpecs}>
              <div className={styles.specItem}>
                <label>POWER OUTPUT</label>
                <span>{product.capacity}</span>
              </div>
              <div className={styles.specItem}>
                <label>VOLTAGE</label>
                <span>240V</span>
              </div>
              <div className={styles.specItem}>
                <label>PHASE</label>
                <span>Single</span>
              </div>
            </div>

            {/* Technical Specifications Section */}
            <div className={styles.specificationSection}>
              <h3 className={styles.specTitle}>
                <span className={styles.greenDot}>●</span> Technical
                Specifications
              </h3>
              <div className={styles.specsList}>
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className={styles.specRow}>
                    <span className={styles.specKey}>{key}</span>
                    <span className={styles.specValue}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warranty Badge */}
            <div className={styles.warrantySection}>
              <div className={styles.warrantyBadge}>
                <span className={styles.shieldIcon}>🛡️</span>
                <div>
                  <h4>2 Year Warranty</h4>
                  <p>Standard manufacturer protection included</p>
                </div>
              </div>
            </div>

            {/* Price and Action */}
            <div className={styles.actionSection}>
              <div className={styles.priceInfo}>
                <span className={styles.startingAt}>STARTING AT</span>
                <span className={styles.price}>
                  ${product.price.toLocaleString()}
                </span>
              </div>
              <button className={styles.quoteBtn}>
                <span>Request a Quote</span>
                <span className={styles.arrow}>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import { LenisProvider } from "../context/LenisContext";
import { useCart } from "../context/CartContext";
import styles from "./ProductDetail.module.css";

// Product data
const PRODUCTS = [
  {
    id: 1,
    name: "Denyo 25 KVA Silent",
    series: "DENYO SERIES",
    description:
      "Ultra-silent operation with high-efficiency diesel combustion...",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80&auto=format&fit=crop",
    rating: 4.9,
    price: 12499,
    status: "IN STOCK",
    brand: "Denyo",
    capacity: "25KVA",
    fuelType: "Diesel",
    priceRange: "10000-15000",
  },
  {
    id: 2,
    name: "Cummins 45 KVA Industrial",
    series: "CUMMINS POWER",
    description:
      "Heavy-duty power for construction sites and large-scale industrial applications...",
    image:
      "https://images.unsplash.com/photo-1621905167918-48416bd8575a?w=500&q=80&auto=format&fit=crop",
    rating: 4.8,
    price: 18750,
    status: "IN STOCK",
    brand: "Cummins",
    capacity: "45KVA",
    fuelType: "Diesel",
    priceRange: "15000-25000",
  },
  {
    id: 3,
    name: "Honshu 15 KVA Compact",
    series: "HONSHU PRIME",
    description:
      "Our proprietary design offering the best power-to-weight ratio in its class...",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80&auto=format&fit=crop",
    rating: 5.0,
    price: 8900,
    status: "IN STOCK",
    brand: "Honshu",
    capacity: "15KVA",
    fuelType: "Diesel",
    priceRange: "5000-15000",
  },
  {
    id: 4,
    name: "CAT C4.4 100 KVA",
    series: "CAT DIESEL",
    description:
      "Maximum reliability for critical mission-infrastructure. Includes automated control systems...",
    image:
      "https://images.unsplash.com/photo-1581092162562-40038f56c232?w=500&q=80&auto=format&fit=crop",
    rating: 4.7,
    price: 34200,
    status: "IN STOCK",
    brand: "Caterpillar",
    capacity: "100KVA",
    fuelType: "Diesel",
    priceRange: "30000-50000",
  },
  {
    id: 5,
    name: "Denyo 60 KVA Hybrid",
    series: "DENYO ELITE",
    description:
      "Eco-friendly hybrid power solution with integrated battery backup for seamless transitions...",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80&auto=format&fit=crop",
    rating: 4.9,
    price: 26500,
    status: "IN STOCK",
    brand: "Denyo",
    capacity: "60KVA",
    fuelType: "Hybrid",
    priceRange: "25000-35000",
  },
  {
    id: 6,
    name: "Cummins 30 KVA Basic",
    series: "CUMMINS PEAK",
    description:
      "No-frills power for farming and rural applications. Easy maintenance and durable...",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80&auto=format&fit=crop",
    rating: 4.8,
    price: 10200,
    status: "IN STOCK",
    brand: "Cummins",
    capacity: "30KVA",
    fuelType: "Diesel",
    priceRange: "10000-15000",
  },
  {
    id: 7,
    name: "Honshu 50 KVA Pro",
    series: "HONSHU PRIME",
    description:
      "Professional-grade generator with advanced cooling and noise reduction features...",
    image:
      "https://images.unsplash.com/photo-1581092162562-40038f56c232?w=500&q=80&auto=format&fit=crop",
    rating: 4.9,
    price: 22000,
    status: "IN STOCK",
    brand: "Honshu",
    capacity: "50KVA",
    fuelType: "Diesel",
    priceRange: "20000-30000",
  },
  {
    id: 8,
    name: "Denyo 75 KVA Premium",
    series: "DENYO SERIES",
    description:
      "Premium quality with extended warranty and comprehensive maintenance packages...",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80&auto=format&fit=crop",
    rating: 5.0,
    price: 31500,
    status: "IN STOCK",
    brand: "Denyo",
    capacity: "75KVA",
    fuelType: "Diesel",
    priceRange: "30000-50000",
  },
  {
    id: 9,
    name: "Cummins 20 KVA Compact",
    series: "CUMMINS POWER",
    description:
      "Compact and portable for mobile applications and temporary power needs...",
    image:
      "https://images.unsplash.com/photo-1621905167918-48416bd8575a?w=500&q=80&auto=format&fit=crop",
    rating: 4.8,
    price: 9500,
    status: "IN STOCK",
    brand: "Cummins",
    capacity: "20KVA",
    fuelType: "Diesel",
    priceRange: "5000-15000",
  },
  {
    id: 10,
    name: "Honshu 80 KVA Industrial",
    series: "HONSHU PRIME",
    description:
      "Heavy-duty industrial generator with integrated load management system...",
    image:
      "https://images.unsplash.com/photo-1581092162562-40038f56c232?w=500&q=80&auto=format&fit=crop",
    rating: 4.9,
    price: 35800,
    status: "IN STOCK",
    brand: "Honshu",
    capacity: "80KVA",
    fuelType: "Diesel",
    priceRange: "30000-50000",
  },
  {
    id: 11,
    name: "CAT C6.6 150 KVA",
    series: "CAT DIESEL",
    description:
      "Enterprise-level power generation with advanced diagnostic capabilities...",
    image:
      "https://images.unsplash.com/photo-1581092162562-40038f56c232?w=500&q=80&auto=format&fit=crop",
    rating: 5.0,
    price: 52000,
    status: "IN STOCK",
    brand: "Caterpillar",
    capacity: "150KVA",
    fuelType: "Diesel",
    priceRange: "50000+",
  },
  {
    id: 12,
    name: "Denyo 40 KVA Standard",
    series: "DENYO SERIES",
    description:
      "Standard configuration suitable for most industrial and commercial applications...",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80&auto=format&fit=crop",
    rating: 4.9,
    price: 16700,
    status: "IN STOCK",
    brand: "Denyo",
    capacity: "40KVA",
    fuelType: "Diesel",
    priceRange: "15000-25000",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  // Scroll to top when product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setAddedToCart(false);
  }, [id]);

  const product = PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <LenisProvider>
        <Navbar />
        <div className={styles.notFound}>
          <h1>Product Not Found</h1>
          <button onClick={() => navigate("/products")}>
            Back to Products
          </button>
        </div>
        <Footer />
      </LenisProvider>
    );
  }

  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581092162562-40038f56c232?w=500&q=80&auto=format&fit=crop",
  ];

  const specifications = {
    "Engine Model": "Kubota V2203-E2BG",
    "Fuel Tank Capacity": "65 Liters",
    "Fuel Consumption": "4.1 L/h (75% Load)",
    "Sound Level": "63 dB(A) @ 7m",
    "Dry Weight": "590 kg",
    "Dimensions (L×W×H)": "1540 x 700 x 950 mm",
  };

  return (
    <LenisProvider>
      <ScrollProgress />
      <Navbar />

      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          {/* Back Button */}
          <button
            className={styles.backBtn}
            onClick={() => navigate("/products")}
          >
            ←
          </button>

          <div className={styles.content}>
            {/* Left Side - Images */}
            <div className={styles.imageSection}>
              <div className={styles.mainImageContainer}>
                <img
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                />
                <span className={styles.statusBadge}>{product.status}</span>
              </div>

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
            </div>

            {/* Right Side - Details */}
            <div className={styles.detailsSection}>
              <div className={styles.breadcrumb}>
                <span>INDUSTRIAL</span>
                <span className={styles.separator}>/</span>
                <span>GENERATORS</span>
                <span className={styles.separator}>/</span>
                <span className={styles.currentCategory}>
                  {product.series.toUpperCase()}
                </span>
              </div>

              <h1 className={styles.productName}>{product.name}</h1>
              <p className={styles.productDescription}>{product.description}</p>

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

              <div className={styles.warrantySection}>
                <div className={styles.warrantyBadge}>
                  <span className={styles.shieldIcon}>🛡️</span>
                  <div>
                    <h4>2 Year Warranty</h4>
                    <p>Standard manufacturer protection included</p>
                  </div>
                </div>
              </div>

              <div className={styles.actionSection}>
                <div className={styles.priceInfo}>
                  <span className={styles.startingAt}>STARTING AT</span>
                  <span className={styles.price}>
                    ${product.price.toLocaleString()}
                  </span>
                </div>
                <button
                  className={`${styles.quoteBtn} ${addedToCart ? styles.added : ""}`}
                  onClick={() => {
                    addToCart(product, 1);
                    setAddedToCart(true);
                    setTimeout(() => setAddedToCart(false), 2000);
                  }}
                >
                  <span>{addedToCart ? "✓ Added to Cart" : "Add to Cart"}</span>
                  <span className={styles.arrow}>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </LenisProvider>
  );
};

export default ProductDetail;

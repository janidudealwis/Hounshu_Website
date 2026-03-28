import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import ScrollReveal from "../components/ScrollReveal";
import { LenisProvider } from "../context/LenisContext";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";
import styles from "./ProductDetail.module.css";
import SEO from "../components/SEO";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  // Fetch product from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", parseInt(id))
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Scroll to top when product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setAddedToCart(false);
  }, [id]);

  if (isLoading) {
    return (
      <LenisProvider>
        <Navbar />
        <div className={styles.notFound}>
          <h1>Loading product...</h1>
        </div>
        <Footer />
      </LenisProvider>
    );
  }

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

  const productImages = product.images?.length > 0
    ? product.images
    : product.image ? [product.image] : [];

  // Build specifications from real product data
  const specEntries = [];
  if (product.capacity)  specEntries.push(["Capacity / Size", product.capacity]);
  if (product.fuel_type && product.fuel_type !== "N/A") specEntries.push(["Fuel Type", product.fuel_type]);
  if (product.specs && typeof product.specs === "object") {
    Object.entries(product.specs).forEach(([key, val]) => {
      if (val) {
        // Convert camelCase key to readable label
        const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
        specEntries.push([label, val]);
      }
    });
  }
  const specifications = Object.fromEntries(specEntries);

  return (
    <LenisProvider>
      <SEO
        title={`${product.name}${product.brand ? ` – ${product.brand}` : ""}`}
        description={
          product.description
            ? `${product.description.slice(0, 140)}...`
            : `Buy ${product.name} from Honshu Enterprises – trusted industrial equipment supplier in Sri Lanka.`
        }
        canonical={`/products/${product.id}`}
        image={product.image || undefined}
        type="product"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: product.image,
          brand: { "@type": "Brand", name: product.brand },
          offers: {
            "@type": "Offer",
            priceCurrency: "LKR",
            price: product.price,
            availability:
              product.status === "IN STOCK"
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            seller: { "@type": "Organization", name: "Honshu Enterprises" },
          },
        }}
      />
      <ScrollProgress />
      <Navbar />

      <main className={styles.pageWrapper}>
        <ScrollReveal direction="fade" delay={0.2}>
          <div className={styles.container}>
            {/* Back Button */}
            <ScrollReveal direction="left" delay={0.4}>
              <button
                className={styles.backBtn}
                onClick={() => navigate("/products")}
              >
                ←
              </button>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <div className={styles.content}>
                {/* Left Side - Images */}
                <ScrollReveal direction="left" delay={0.8}>
                  <div className={styles.imageSection}>
                    <ScrollReveal direction="scale" delay={1.0}>
                      <div className={styles.mainImageContainer}>
                        <img
                          src={productImages[selectedImageIndex]}
                          alt={product.name}
                        />
                        <span className={styles.statusBadge}>{product.status}</span>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={1.2}>
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
            </ScrollReveal>
          </div>
        </ScrollReveal>

        {/* Right Side - Details */}
        <div className={styles.detailsSection}>
              <div className={styles.breadcrumb}>
                <span>INDUSTRIAL</span>
                <span className={styles.separator}>/</span>
                <span>{product.category?.toUpperCase()}</span>
                {product.series && <>
                  <span className={styles.separator}>/</span>
                  <span className={styles.currentCategory}>{product.series.toUpperCase()}</span>
                </>}
              </div>

              <h1 className={styles.productName}>{product.name}</h1>
              <p className={styles.productDescription}>{product.description}</p>

              <div className={styles.keySpecs}>
                {product.capacity && (
                  <div className={styles.specItem}>
                    <label>CAPACITY / SIZE</label>
                    <span>{product.capacity}</span>
                  </div>
                )}
                {product.fuel_type && product.fuel_type !== "N/A" && (
                  <div className={styles.specItem}>
                    <label>FUEL TYPE</label>
                    <span>{product.fuel_type}</span>
                  </div>
                )}
                {product.specs?.phase && (
                  <div className={styles.specItem}>
                    <label>PHASE</label>
                    <span>{product.specs.phase}</span>
                  </div>
                )}
                {product.specs?.voltageOutput && (
                  <div className={styles.specItem}>
                    <label>VOLTAGE</label>
                    <span>{product.specs.voltageOutput}</span>
                  </div>
                )}
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
                    LKR {product.price.toLocaleString()}
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
        </ScrollReveal>
      </div>
    </ScrollReveal>
  </main>

  <Footer />
</LenisProvider>
  );
};

export default ProductDetail;

import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import { LenisProvider } from "../context/LenisContext";
import { useCart } from "../context/CartContext";
import styles from "./Products.module.css";

const PRODUCTS = [
  {
    id: 1,
    name: "Denyo 25 KVA Silent",
    series: "DENYO SERIES",
    description:
      "Ultra-silent operation with high-efficiency diesel combustion...",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1621905167918-48416bd8575a?w=400&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1581092162562-40038f56c232?w=400&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1581092162562-40038f56c232?w=400&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1621905167918-48416bd8575a?w=400&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1581092162562-40038f56c232?w=400&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1581092162562-40038f56c232?w=400&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop",
    rating: 4.9,
    price: 16700,
    status: "IN STOCK",
    brand: "Denyo",
    capacity: "40KVA",
    fuelType: "Diesel",
    priceRange: "15000-25000",
  },
];

const ITEMS_PER_PAGE = 6;

const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCapacity, setSelectedCapacity] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [addedToCart, setAddedToCart] = useState(null);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const brands = ["All", ...new Set(PRODUCTS.map((p) => p.brand))];
  const capacities = ["All", ...new Set(PRODUCTS.map((p) => p.capacity))];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const brandMatch =
        selectedBrand === "All" || product.brand === selectedBrand;
      const capacityMatch =
        selectedCapacity === "All" || product.capacity === selectedCapacity;
      return brandMatch && capacityMatch;
    });
  }, [selectedBrand, selectedCapacity]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const getPaginationPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <LenisProvider>
      <ScrollProgress />
      <Navbar />
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>FILTERS</h3>

              <div className={styles.filter}>
                <label className={styles.filterLabel}>🏢 Brand</label>
                <div className={styles.filterOptions}>
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      className={`${styles.filterOption} ${selectedBrand === brand ? styles.active : ""}`}
                      onClick={() => {
                        setSelectedBrand(brand);
                        setCurrentPage(1);
                      }}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filter}>
                <label className={styles.filterLabel}>⚡ Power Capacity</label>
                <div className={styles.filterOptions}>
                  {capacities.map((capacity) => (
                    <button
                      key={capacity}
                      className={`${styles.filterOption} ${selectedCapacity === capacity ? styles.active : ""}`}
                      onClick={() => {
                        setSelectedCapacity(capacity);
                        setCurrentPage(1);
                      }}
                    >
                      {capacity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Selection */}
              <div className={styles.quickSelection}>
                <h4 className={styles.quickTitle}>Quick Selection</h4>
                <div className={styles.quickButtons}>
                  <button
                    className={styles.quickBtn}
                    onClick={() => {
                      setSelectedBrand("Denyo");
                      setSelectedCapacity("All");
                    }}
                  >
                    Denyo
                  </button>
                  <button
                    className={styles.quickBtn}
                    onClick={() => {
                      setSelectedBrand("Cummins");
                      setSelectedCapacity("All");
                    }}
                  >
                    Cummins
                  </button>
                  <button
                    className={styles.quickBtn}
                    onClick={() => {
                      setSelectedBrand("All");
                      setSelectedCapacity("25KVA");
                    }}
                  >
                    25MVA
                  </button>
                  <button
                    className={styles.quickBtn}
                    onClick={() => {
                      setSelectedBrand("Honshu");
                      setSelectedCapacity("All");
                    }}
                  >
                    Silent
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className={styles.mainContent}>
            <div className={styles.header}>
              <h1 className={styles.pageTitle}>Industrial Generators</h1>
              <p className={styles.pageDescription}>
                High-performance power solutions engineered for reliability in
                the most demanding environments.
              </p>
            </div>

            <div className={styles.controls}>
              <div className={styles.dropdowns}>
                <select className={styles.dropdown} defaultValue="All Brands">
                  <option>All Brands</option>
                </select>
                <select className={styles.dropdown} defaultValue="Capacity">
                  <option>Capacity</option>
                </select>
              </div>
              <p className={styles.resultCount}>
                Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
                results
              </p>
            </div>

            {/* Products Grid */}
            <div className={styles.productsGrid}>
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className={styles.productCard}
                  onClick={() => navigate(`/products/${product.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImage}
                    />
                    <span className={styles.statusBadge}>{product.status}</span>
                  </div>

                  <div className={styles.cardContent}>
                    <span className={styles.series}>{product.series}</span>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productDesc}>{product.description}</p>

                    <div className={styles.rating}>
                      <span className={styles.ratingValue}>
                        {product.rating}
                      </span>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.floor(product.rating)
                                ? styles.starFilled
                                : styles.starEmpty
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.priceSection}>
                      <span className={styles.startingAt}>Starting at</span>
                      <div className={styles.priceRow}>
                        <span className={styles.price}>
                          ${product.price.toLocaleString()}
                        </span>
                        <button
                          className={`${styles.addToCartBtn} ${addedToCart === product.id ? styles.added : ""}`}
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          {addedToCart === product.id ? (
                            <span>✓</span>
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <circle cx="9" cy="21" r="1" />
                              <circle cx="20" cy="21" r="1" />
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
              <button
                className={styles.paginationBtn}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ←
              </button>

              {getPaginationPages().map((page, index) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className={styles.paginationEllipsis}
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    className={`${styles.paginationBtn} ${currentPage === page ? styles.active : ""}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                className={styles.paginationBtn}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                →
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </LenisProvider>
  );
};

export default Products;

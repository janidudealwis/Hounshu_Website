import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import ScrollReveal from "../components/ScrollReveal";
import { LenisProvider } from "../context/LenisContext";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";
import { PRODUCT_CATEGORIES } from "../constants/productCategories";
import { MOCK_PRODUCTS } from "../constants/mockProducts";
import styles from "./Products.module.css";

const ITEMS_PER_PAGE = 6;

const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCapacity, setSelectedCapacity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [addedToCart, setAddedToCart] = useState(null);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        console.log("Starting to fetch products...");

        // Check if Supabase is available
        if (!supabase) {
          console.log("Supabase not available, using mock products data");
          setProducts(MOCK_PRODUCTS);
          console.log("Mock products set:", MOCK_PRODUCTS);
          return;
        }

        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        console.log("Supabase data fetched:", data);
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products from Supabase:", err);
        console.log("Using mock products data as fallback");
        // Use mock data as fallback when Supabase is not available
        setProducts(MOCK_PRODUCTS);
        console.log("Fallback products set:", MOCK_PRODUCTS);
      } finally {
        setIsLoading(false);
        console.log("Loading finished");
      }
    };

    fetchProducts();
  }, []);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const brands = ["All", ...new Set(products.map((p) => p.brand))];
  const capacities = ["All", ...new Set(products.map((p) => p.capacity))];
  const categories = ["All", ...PRODUCT_CATEGORIES];

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const brandMatch =
        selectedBrand === "All" || product.brand === selectedBrand;
      const capacityMatch =
        selectedCapacity === "All" || product.capacity === selectedCapacity;
      const categoryMatch =
        selectedCategory === "All" || product.category === selectedCategory;
      return brandMatch && capacityMatch && categoryMatch;
    });
    console.log("Filtered products:", filtered);
    console.log("Products count:", products.length);
    console.log("Filtered count:", filtered.length);
    return filtered;
  }, [products, selectedBrand, selectedCapacity, selectedCategory]);

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

  // Debug logs
  console.log("Component render - isLoading:", isLoading, "products.length:", products.length, "filteredProducts.length:", filteredProducts.length, "paginatedProducts.length:", paginatedProducts.length);

  return (
    <LenisProvider>
      <ScrollProgress />
      <Navbar />
      <main className={styles.pageWrapper}>
        <ScrollReveal direction="fade" delay={0.2}>
          <div className={styles.container}>
            {/* Sidebar */}
            <ScrollReveal direction="left" delay={0.4}>
              <aside className={styles.sidebar}>
                <div className={styles.filterSection}>
                  <h3 className={styles.filterTitle}>FILTERS</h3>

                  <ScrollReveal direction="up" delay={0.6}>
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
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={0.8}>
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
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={1.0}>
                    <div className={styles.filter}>
                      <label className={styles.filterLabel}>🏷️ Category</label>
                      <div className={styles.filterOptions}>
                        {categories.map((category) => (
                          <button
                            key={category}
                            className={`${styles.filterOption} ${selectedCategory === category ? styles.active : ""}`}
                            onClick={() => {
                              setSelectedCategory(category);
                              setCurrentPage(1);
                            }}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Quick Selection */}
                  <ScrollReveal direction="up" delay={1.2}>
                    <div className={styles.quickSelection}>
                      <h4 className={styles.quickTitle}>Quick Selection</h4>
                      <div className={styles.quickButtons}>
                        <button
                          className={styles.quickBtn}
                          onClick={() => {
                            setSelectedBrand("Denyo");
                            setSelectedCapacity("All");
                            setSelectedCategory("All");
                          }}
                        >
                          Denyo
                        </button>
                        <button
                          className={styles.quickBtn}
                          onClick={() => {
                            setSelectedBrand("Cummins");
                            setSelectedCapacity("All");
                            setSelectedCategory("All");
                          }}
                        >
                          Cummins
                        </button>
                        <button
                          className={styles.quickBtn}
                          onClick={() => {
                            setSelectedBrand("All");
                            setSelectedCapacity("25KVA");
                            setSelectedCategory("All");
                          }}
                        >
                          25MVA
                        </button>
                        <button
                          className={styles.quickBtn}
                          onClick={() => {
                            setSelectedBrand("Honshu");
                            setSelectedCapacity("All");
                            setSelectedCategory("All");
                          }}
                        >
                          Silent
                        </button>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </aside>
            </ScrollReveal>

            {/* Main Content */}
            <ScrollReveal direction="right" delay={0.4}>
              <section className={styles.mainContent}>
                <ScrollReveal direction="up" delay={0.6}>
                  <div className={styles.header}>
                    <h1 className={styles.pageTitle}>All Products</h1>
                    <p className={styles.pageDescription}>
                      High-performance power solutions engineered for reliability in
                      the most demanding environments.
                    </p>
                  </div>
                </ScrollReveal>

            <div className={styles.controls}>
              <div className={styles.dropdowns}>
                <select
                  className={styles.dropdown}
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Brands</option>
                  {brands.slice(1).map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                <select
                  className={styles.dropdown}
                  value={selectedCapacity}
                  onChange={(e) => {
                    setSelectedCapacity(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Capacities</option>
                  {capacities.slice(1).map((capacity) => (
                    <option key={capacity} value={capacity}>
                      {capacity}
                    </option>
                  ))}
                </select>
                <select
                  className={styles.dropdown}
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Categories</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <p className={styles.resultCount}>
                Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
                results
              </p>
            </div>

            {isLoading ? (
              <div className={styles.loadingContainer}>
                <p>Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className={styles.emptyContainer}>
                <p>No products available yet.</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className={styles.emptyContainer}>
                <p>
                  No products match your filters. Try adjusting your selection.
                </p>
              </div>
            ) : (
              <>
                {console.log("About to render products grid with", paginatedProducts.length, "products")}
                {/* Products Grid */}
                <ScrollReveal direction="up" delay={1.0}>
                  <div className={styles.productsGrid}>
                    {paginatedProducts.map((product, index) => (
                      <ScrollReveal
                        key={product.id}
                        direction="up"
                        delay={1.2 + (index * 0.1)}
                        duration={0.4}
                      >
                        <div
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
                        <span className={styles.statusBadge}>
                          {product.status}
                        </span>
                      </div>

                      <div className={styles.cardContent}>
                        <span className={styles.series}>{product.series}</span>
                        <h3 className={styles.productName}>{product.name}</h3>
                        <p className={styles.productDesc}>
                          {product.description}
                        </p>

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
                  </ScrollReveal>
                  ))}
                  </div>
                </ScrollReveal>

                {/* Pagination */}
                <ScrollReveal direction="up" delay={1.4}>
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
                </ScrollReveal>
              </>
            )}
          </section>
        </ScrollReveal>
        </div>
      </ScrollReveal>
    </main>
    <Footer />
  </LenisProvider>
  );
};

export default Products;

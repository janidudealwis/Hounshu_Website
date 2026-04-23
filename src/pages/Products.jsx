import React, { useState, useMemo, useEffect } from "react";
import useScrollToTop from "../hooks/useScrollToTop";
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
import SEO from "../components/SEO";

const ITEMS_PER_PAGE = 15;

const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [addedToCart, setAddedToCart] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useScrollToTop();

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        if (!supabase) {
          setProducts(MOCK_PRODUCTS);
          return;
        }

        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts(MOCK_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const brands = ["All", ...new Set(products.map((p) => p.brand))];
  const categories = ["All", ...PRODUCT_CATEGORIES];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const brandMatch = selectedBrand === "All" || product.brand === selectedBrand;
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
      return brandMatch && categoryMatch;
    });
  }, [products, selectedBrand, selectedCategory]);

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
      <SEO
        title="Industrial Equipment – Generators, Forklifts & More"
        description="Browse Honshu Enterprises' full range of industrial equipment — diesel generators, heavy forklifts, excavators, motor graders, road rollers and power systems available in Sri Lanka."
        canonical="/products"
      />
      <ScrollProgress />
      <Navbar />
      <main className={styles.pageWrapper}>
        <ScrollReveal direction="fade" delay={0.2}>
          <div className={styles.container}>
            {/* Mobile Filter Toggle */}
            <button
              className={`${styles.mobileFilterToggle} ${filtersOpen ? styles.mobileFilterToggleOpen : ""}`}
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <span className={styles.mobileFilterLeft}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
                <span>Filters</span>
                {(selectedBrand !== "All" || selectedCategory !== "All") && (
                  <span className={styles.activeCount}>
                    {[selectedBrand, selectedCategory].filter(v => v !== "All").length}
                  </span>
                )}
              </span>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ transform: filtersOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Sidebar */}
            <ScrollReveal direction="left" delay={0.4}>
              <aside className={`${styles.sidebar} ${!filtersOpen ? styles.sidebarCollapsed : ""}`}>
                <div className={styles.filterCard}>

                  {/* Filter Header */}
                  <div className={styles.filterHeader}>
                    <div className={styles.filterHeaderLeft}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                      </svg>
                      <span className={styles.filterTitle}>Filters</span>
                      {(selectedBrand !== "All" || selectedCategory !== "All") && (
                        <span className={styles.activeCount}>
                          {[selectedBrand, selectedCategory].filter(v => v !== "All").length}
                        </span>
                      )}
                    </div>
                    {(selectedBrand !== "All" || selectedCategory !== "All") && (
                      <button
                        className={styles.clearAll}
                        onClick={() => {
                          setSelectedBrand("All");
                          setSelectedCategory("All");
                          setCurrentPage(1);
                        }}
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  <div className={styles.filterBody}>

                    {/* Brand */}
                    <div className={styles.filterGroup}>
                      <div className={styles.filterGroupHeader}>
                        <span className={styles.filterLabel}>Brand</span>
                        {selectedBrand !== "All" && (
                          <button className={styles.clearOne} onClick={() => { setSelectedBrand("All"); setCurrentPage(1); }}>✕</button>
                        )}
                      </div>
                      <div className={styles.filterChips}>
                        {brands.map((brand) => (
                          <button
                            key={brand}
                            className={`${styles.chip} ${selectedBrand === brand ? styles.chipActive : ""}`}
                            onClick={() => { setSelectedBrand(brand); setCurrentPage(1); }}
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.divider} />

                    {/* Category */}
                    <div className={styles.filterGroup}>
                      <div className={styles.filterGroupHeader}>
                        <span className={styles.filterLabel}>Category</span>
                        {selectedCategory !== "All" && (
                          <button className={styles.clearOne} onClick={() => { setSelectedCategory("All"); setCurrentPage(1); }}>✕</button>
                        )}
                      </div>
                      <div className={styles.filterChips}>
                        {categories.map((category) => (
                          <button
                            key={category}
                            className={`${styles.chip} ${selectedCategory === category ? styles.chipActive : ""}`}
                            onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.divider} />

                    {/* Quick Presets */}
                    <div className={styles.filterGroup}>
                      <span className={styles.filterLabel}>Quick Presets</span>
                      <div className={styles.presetButtons}>
                        <button className={styles.presetBtn} onClick={() => { setSelectedBrand("Denyo"); setSelectedCategory("All"); setCurrentPage(1); }}>
                          Denyo
                        </button>
                        <button className={styles.presetBtn} onClick={() => { setSelectedBrand("Cummins"); setSelectedCategory("All"); setCurrentPage(1); }}>
                          Cummins
                        </button>
                        <button className={styles.presetBtn} onClick={() => { setSelectedBrand("Honshu"); setSelectedCategory("All"); setCurrentPage(1); }}>
                          Honshu
                        </button>
                      </div>
                    </div>

                  </div>
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

                        <div className={styles.priceSection}>
                          <div className={styles.priceRow}>
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

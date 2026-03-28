import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import { LenisProvider } from "../context/LenisContext";
import AddProductForm from "../components/AddProductForm";
import EditProductForm from "../components/EditProductForm";
import { supabase } from "../lib/supabase";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout, isAdminLoggedIn, adminEmail } = useAdmin();
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate("/admin/login");
      return;
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    fetchProducts();
  }, [isAdminLoggedIn, navigate]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
      setError("");
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductAdded = () => {
    setShowAddForm(false);
    fetchProducts();
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowAddForm(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductUpdated = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);
      if (error) throw error;
      setProducts(products.filter((p) => p.id !== productId));
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  const inStockCount = products.filter((p) => p.status === "IN STOCK").length;

  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.series?.toLowerCase().includes(q)
    );
  });

  return (
    <LenisProvider>
      <ScrollProgress />
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.container}>

          {/* ── Header ── */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.headerIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>
              <div>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <p className={styles.userInfo}>{adminEmail}</p>
              </div>
            </div>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>

          {/* ── Stats ── */}
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{products.length}</span>
              <span className={styles.statLabel}>Total Products</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{categories.length}</span>
              <span className={styles.statLabel}>Categories</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{inStockCount}</span>
              <span className={styles.statLabel}>In Stock</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{products.length - inStockCount}</span>
              <span className={styles.statLabel}>Out of Stock</span>
            </div>
          </div>

          {error && <div className={styles.errorMsg}>{error}</div>}

          {/* ── Add / Edit Forms ── */}
          {showAddForm && (
            <AddProductForm onProductAdded={handleProductAdded} />
          )}
          {editingProduct && (
            <EditProductForm
              product={editingProduct}
              onProductUpdated={handleProductUpdated}
              onCancel={handleCancelEdit}
            />
          )}

          {/* ── Products Table ── */}
          <div className={styles.tableSection}>
            <div className={styles.tableHeader}>
              <div className={styles.tableHeaderLeft}>
                <h2 className={styles.tableTitle}>Products</h2>
                <span className={styles.tableCount}>{filteredProducts.length}</span>
              </div>
              <div className={styles.tableHeaderRight}>
                <div className={styles.searchWrap}>
                  <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className={styles.searchInput}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button
                  className={`${styles.addBtn} ${showAddForm ? styles.addBtnActive : ""}`}
                  onClick={() => {
                    setShowAddForm(!showAddForm);
                    setEditingProduct(null);
                  }}
                >
                  {showAddForm ? "✕ Cancel" : "+ Add Product"}
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className={styles.stateMsg}>
                <div className={styles.spinner} />
                Loading products...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className={styles.stateMsg}>
                {search ? "No products match your search." : 'No products yet. Click "+ Add Product" to get started.'}
              </div>
            ) : (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Capacity</th>
                      <th>Status</th>
                      <th>Price (LKR)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className={styles.tableRow}>
                        <td>
                          <div className={styles.productCell}>
                            {product.image ? (
                              <img src={product.image} alt={product.name} className={styles.thumb} />
                            ) : (
                              <div className={styles.thumbPlaceholder}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5">
                                  <rect x="3" y="3" width="18" height="18" rx="2" />
                                  <circle cx="8.5" cy="8.5" r="1.5" />
                                  <polyline points="21 15 16 10 5 21" />
                                </svg>
                              </div>
                            )}
                            <div>
                              <div className={styles.productName}>{product.name}</div>
                              <div className={styles.productMeta}>
                                {product.brand}{product.series ? ` · ${product.series}` : ""}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={styles.badge}>{product.category || "—"}</span>
                        </td>
                        <td className={styles.capacityCell}>
                          {product.capacity || "—"}
                        </td>
                        <td>
                          <span className={`${styles.statusBadge} ${
                            product.status === "IN STOCK"
                              ? styles.statusIn
                              : styles.statusOut
                          }`}>
                            {product.status}
                          </span>
                        </td>
                        <td className={styles.priceCell}>
                          {product.price?.toLocaleString()}
                        </td>
                        <td>
                          <div className={styles.actions}>
                            <button
                              className={styles.editBtn}
                              onClick={() => handleEditProduct(product)}
                            >
                              Edit
                            </button>
                            <button
                              className={styles.deleteBtn}
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </LenisProvider>
  );
}

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
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate("/admin/login");
      return;
    }
    // Scroll to top on component mount
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
    setEditingProductId(product.id);
    setEditingProduct(product);
    setShowAddForm(false);
  };

  const handleProductUpdated = () => {
    setEditingProductId(null);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

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

  return (
    <LenisProvider>
      <ScrollProgress />
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <h1 className={styles.title}>Admin Dashboard</h1>
              <p className={styles.userInfo}>Logged in as: {adminEmail}</p>
            </div>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </div>

          <div className={styles.content}>
            <div className={styles.controls}>
              <h2>Products Management</h2>
              <button
                onClick={() => {
                  setShowAddForm(!showAddForm);
                  setEditingProductId(null);
                  setEditingProduct(null);
                }}
                className={styles.addBtn}
              >
                {showAddForm ? "Cancel" : "+ Add New Product"}
              </button>
            </div>

            {error && <div className={styles.errorMsg}>{error}</div>}

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

            <div className={styles.productsSection}>
              <h3 className={styles.productsTitle}>
                All Products ({products.length})
              </h3>

              {isLoading ? (
                <div className={styles.loading}>Loading products...</div>
              ) : products.length === 0 ? (
                <div className={styles.empty}>
                  No products yet. Click "Add New Product" to get started.
                </div>
              ) : (
                <div className={styles.productsList}>
                  {products.map((product) => (
                    <div key={product.id} className={styles.productCard}>
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className={styles.productImage}
                        />
                      )}
                      <div className={styles.productInfo}>
                        <h4 className={styles.productName}>{product.name}</h4>
                        <p className={styles.productBrand}>{product.brand}</p>
                        <p className={styles.productSeries}>{product.series}</p>
                        <div className={styles.productDetails}>
                          <span className={styles.capacity}>
                            {product.capacity}
                          </span>
                          <span className={styles.fuelType}>
                            {product.fuelType}
                          </span>
                          <span className={styles.status}>
                            {product.status}
                          </span>
                        </div>
                        <div className={styles.productMeta}>
                          <span className={styles.price}>
                            Rs. {product.price?.toLocaleString()}
                          </span>
                          <span className={styles.rating}>
                            ⭐ {product.rating?.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className={styles.buttonGroup}>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className={styles.editBtn}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className={styles.deleteBtn}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </LenisProvider>
  );
}

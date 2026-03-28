import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { validateFile, sanitizeInput, isValidLength } from "../utils/security";
import { PRODUCT_CATEGORIES, CATEGORY_FIELDS } from "../constants/productCategories";
import styles from "./AddProductForm.module.css";

export default function EditProductForm({ product, onProductUpdated, onCancel }) {
  const [category, setCategory] = useState("");
  const [common, setCommon] = useState({
    name: "", brand: "", series: "", description: "",
    price: "", status: "IN STOCK", rating: 4.5,
  });
  const [specs, setSpecs] = useState({});
  const [images, setImages] = useState([]); // [{ type:'existing'|'new', url?, file?, preview }]
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Pre-populate from the product being edited
  useEffect(() => {
    if (!product) return;
    setCategory(product.category || "");
    setCommon({
      name:        product.name || "",
      brand:       product.brand || "",
      series:      product.series || "",
      description: product.description || "",
      price:       product.price || "",
      status:      product.status || "IN STOCK",
      rating:      product.rating || 4.5,
    });
    // Load existing images
    const existingUrls = product.images?.length > 0
      ? product.images
      : product.image ? [product.image] : [];
    setImages(existingUrls.map((url) => ({ type: "existing", url, preview: url })));

    // Re-hydrate specs: combine specs JSONB + mapped column values
    const savedSpecs = product.specs || {};
    const fields = CATEGORY_FIELDS[product.category] || [];
    const hydrated = { ...savedSpecs };
    fields.forEach((f) => {
      if (f.mapTo === "capacity")  hydrated[f.name] = product.capacity  || "";
      if (f.mapTo === "fuel_type") hydrated[f.name] = product.fuel_type || "";
    });
    setSpecs(hydrated);
  }, [product]);

  const fields = category ? (CATEGORY_FIELDS[category] || []) : [];

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    // If category changed, reset specs but preserve mapped column values for new category
    if (newCat !== category) {
      const newFields = CATEGORY_FIELDS[newCat] || [];
      const fresh = {};
      newFields.forEach((f) => {
        if (f.mapTo === "capacity")  fresh[f.name] = product.capacity  || "";
        if (f.mapTo === "fuel_type") fresh[f.name] = product.fuel_type || "";
      });
      setSpecs(fresh);
    }
    setCategory(newCat);
    setError("");
  };

  const handleCommonChange = (e) => {
    const { name, value } = e.target;
    setCommon((prev) => ({
      ...prev,
      [name]: name === "price" || name === "rating" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setSpecs((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (images.length >= 3) return;
    const validation = validateFile(file, {
      maxSize: 5 * 1024 * 1024,
      allowedTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    });
    if (!validation.valid) {
      setError(validation.errors.join(", "));
      e.target.value = "";
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((prev) => [...prev, { type: "new", file, preview: reader.result }]);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!category) { setError("Please select a category."); return; }
    if (!isValidLength(common.name, 2, 200)) { setError("Product name must be 2–200 characters."); return; }
    if (!isValidLength(common.brand, 2, 100)) { setError("Brand must be 2–100 characters."); return; }
    if (!common.price || isNaN(common.price)) { setError("Please enter a valid price."); return; }
    if (common.description && !isValidLength(common.description, 0, 5000)) {
      setError("Description must be under 5,000 characters."); return;
    }

    for (const field of fields) {
      if (field.required && !specs[field.name]?.trim()) {
        setError(`"${field.label}" is required for this category.`);
        return;
      }
    }

    setIsLoading(true);
    try {
      const capacityField = fields.find((f) => f.mapTo === "capacity");
      const fuelField     = fields.find((f) => f.mapTo === "fuel_type");
      const capacity  = capacityField ? (specs[capacityField.name] || "") : (product.capacity || "");
      const fuelType  = fuelField     ? (specs[fuelField.name] || "N/A") : (product.fuel_type || "N/A");

      const specsJson = {};
      fields.forEach((f) => {
        if (!f.mapTo && specs[f.name]) specsJson[f.name] = specs[f.name];
      });

      // Build final image URLs: keep existing + upload new
      const finalUrls = [];
      for (const img of images) {
        if (img.type === "existing") {
          finalUrls.push(img.url);
        } else {
          try {
            const fileName = `${Date.now()}-${img.file.name}`;
            const { error: uploadError } = await supabase.storage
              .from("product-images")
              .upload(`products/${fileName}`, img.file);
            if (!uploadError) {
              const { data: urlData } = supabase.storage
                .from("product-images")
                .getPublicUrl(`products/${fileName}`);
              finalUrls.push(urlData.publicUrl);
            }
          } catch { /* skip */ }
        }
      }
      const imageUrl = finalUrls[0] || product.image || "";

      const { error: dbError } = await supabase
        .from("products")
        .update({
          name:        sanitizeInput(common.name.trim()),
          brand:       sanitizeInput(common.brand.trim()),
          series:      sanitizeInput(common.series.trim()),
          description: sanitizeInput(common.description.trim()),
          image:       imageUrl,
          images:      finalUrls,
          price:       parseFloat(common.price),
          capacity:    sanitizeInput(capacity.trim()),
          category:    category,
          fuel_type:   fuelType,
          status:      common.status,
          rating:      parseFloat(common.rating) || 4.5,
          specs:       specsJson,
        })
        .eq("id", product.id);

      if (dbError) throw dbError;

      setSuccess("Product updated successfully!");
      setTimeout(onProductUpdated, 1500);
    } catch (err) {
      setError(err.message || "Failed to update product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Edit Product</h3>

      {error   && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>

        {/* ── Category ──────────────────────────────────── */}
        <div className={styles.categoryStep}>
          <label className={styles.label}>Category *</label>
          <select value={category} onChange={handleCategoryChange}
            className={styles.categoryPicker} disabled={isLoading} required>
            <option value="">— Choose a category —</option>
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {category && (
          <div className={styles.grid}>

            {/* ── Common fields ── */}
            <div className={styles.sectionHeader}><span>Product Info</span></div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Product Name *</label>
              <input type="text" name="name" value={common.name}
                onChange={handleCommonChange} placeholder="e.g., Denyo 25 KVA Silent"
                className={styles.input} disabled={isLoading} required minLength={2} maxLength={200} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Brand *</label>
              <input type="text" name="brand" value={common.brand}
                onChange={handleCommonChange} placeholder="e.g., Denyo"
                className={styles.input} disabled={isLoading} required minLength={2} maxLength={100} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Series / Model</label>
              <input type="text" name="series" value={common.series}
                onChange={handleCommonChange} placeholder="e.g., DCA Series"
                className={styles.input} disabled={isLoading} maxLength={100} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Price (Rs.) *</label>
              <input type="number" name="price" value={common.price}
                onChange={handleCommonChange} placeholder="e.g., 450000"
                className={styles.input} disabled={isLoading} required min="0" max="99999999" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <select name="status" value={common.status}
                onChange={handleCommonChange} className={styles.input} disabled={isLoading}>
                <option value="IN STOCK">In Stock</option>
                <option value="OUT OF STOCK">Out of Stock</option>
                <option value="PRE ORDER">Pre Order</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Rating (0–5)</label>
              <input type="number" name="rating" value={common.rating}
                onChange={handleCommonChange} min="0" max="5" step="0.1"
                className={styles.input} disabled={isLoading} />
            </div>

            {/* ── Specs ── */}
            <div className={styles.sectionHeader}><span>Specifications</span></div>

            {fields.map((field) => (
              <div key={field.name} className={styles.formGroup}>
                <label className={styles.label}>
                  {field.label}{field.required ? " *" : ""}
                </label>
                {field.type === "select" ? (
                  <select name={field.name} value={specs[field.name] || ""}
                    onChange={handleSpecChange} className={styles.input} disabled={isLoading}>
                    <option value="">— Select —</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input type={field.type} name={field.name}
                    value={specs[field.name] || ""}
                    onChange={handleSpecChange}
                    placeholder={field.placeholder}
                    className={styles.input} disabled={isLoading} />
                )}
              </div>
            ))}

            {/* ── Image & Description ── */}
            <div className={styles.sectionHeader}><span>Media & Description</span></div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Product Images — up to 3</label>
              <div className={styles.imagesGrid}>
                {images.map((img, i) => (
                  <div key={i} className={styles.imageSlot}>
                    <img src={img.preview} alt={`Image ${i + 1}`} />
                    <button
                      type="button"
                      className={styles.removeImageBtn}
                      onClick={() => removeImage(i)}
                      disabled={isLoading}
                    >×</button>
                  </div>
                ))}
                {images.length < 3 && (
                  <label className={`${styles.imageSlot} ${styles.addSlot}`}>
                    <span>+</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={isLoading}
                      style={{ display: "none" }}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Description</label>
              <textarea name="description" value={common.description}
                onChange={handleCommonChange}
                placeholder="Enter product description..."
                className={styles.textarea} rows="4"
                disabled={isLoading} maxLength={5000} />
            </div>
          </div>
        )}

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Product"}
          </button>
          <button type="button" onClick={onCancel}
            className={styles.cancelBtn} disabled={isLoading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

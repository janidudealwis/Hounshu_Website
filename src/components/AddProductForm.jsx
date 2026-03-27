import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { validateFile, sanitizeInput, isValidLength } from "../utils/security";
import { PRODUCT_CATEGORIES } from "../constants/productCategories";
import styles from "./AddProductForm.module.css";

export default function AddProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    series: "",
    description: "",
    price: "",
    capacity: "",
    category: "",
    fuelType: "Diesel",
    status: "IN STOCK",
    rating: 4.5,
    priceRange: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "rating" ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file
      const validation = validateFile(file, {
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      });

      if (!validation.valid) {
        setError(validation.errors.join(', '));
        e.target.value = ''; // Reset file input
        return;
      }

      setError(''); // Clear any previous errors
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.brand ||
        !formData.price ||
        !formData.capacity ||
        !formData.category
      ) {
        setError("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      // Enhanced validation
      if (!isValidLength(formData.name, 2, 200)) {
        setError("Product name must be between 2 and 200 characters");
        setIsLoading(false);
        return;
      }

      if (!isValidLength(formData.brand, 2, 100)) {
        setError("Brand name must be between 2 and 100 characters");
        setIsLoading(false);
        return;
      }

      if (formData.description && !isValidLength(formData.description, 0, 5000)) {
        setError("Description must be less than 5000 characters");
        setIsLoading(false);
        return;
      }

      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name.trim()),
        brand: sanitizeInput(formData.brand.trim()),
        series: sanitizeInput(formData.series.trim()),
        description: sanitizeInput(formData.description.trim()),
        capacity: sanitizeInput(formData.capacity.trim()),
        category: sanitizeInput(formData.category.trim()),
        priceRange: sanitizeInput(formData.priceRange.trim()),
      };

      let imageUrl =
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop";

      // Try to upload image if one is selected
      if (imageFile) {
        try {
          const fileName = `${Date.now()}-${imageFile.name}`;
          const { data: uploadData, error: uploadError } =
            await supabase.storage
              .from("product-images")
              .upload(`products/${fileName}`, imageFile);

          if (uploadError) {
            console.warn(
              "Image upload failed, using default image:",
              uploadError,
            );
          } else {
            // Get public URL of the uploaded image
            const { data: publicUrlData } = supabase.storage
              .from("product-images")
              .getPublicUrl(`products/${fileName}`);

            imageUrl = publicUrlData.publicUrl;
          }
        } catch (imgErr) {
          console.warn("Image upload error, using default image:", imgErr);
        }
      }

      // Insert product with sanitized data
      const { data, error } = await supabase.from("products").insert([
        {
          name: sanitizedData.name,
          brand: sanitizedData.brand,
          series: sanitizedData.series,
          description: sanitizedData.description,
          image: imageUrl,
          price: parseFloat(formData.price),
          capacity: sanitizedData.capacity,
          category: sanitizedData.category,
          fuel_type: formData.fuelType,
          status: formData.status,
          rating: parseFloat(formData.rating) || 4.5,
          price_range: sanitizedData.priceRange,
        },
      ]);

      if (error) {
        throw error;
      }

      setSuccess("Product added successfully!");
      setFormData({
        name: "",
        brand: "",
        series: "",
        description: "",
        price: "",
        capacity: "",
        category: "",
        fuelType: "Diesel",
        status: "IN STOCK",
        rating: 4.5,
        priceRange: "",
      });
      setImageFile(null);
      setImagePreview(null);

      // Reset form and notify parent
      setTimeout(() => {
        onProductAdded();
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Add New Product</h3>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          {/* Product Name */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Denyo 25 KVA Silent"
              className={styles.input}
              disabled={isLoading}
              required
              minLength={2}
              maxLength={200}
            />
          </div>

          {/* Brand */}
          <div className={styles.formGroup}>
            <label htmlFor="brand" className={styles.label}>
              Brand *
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g., Denyo"
              className={styles.input}
              disabled={isLoading}
              required
              minLength={2}
              maxLength={100}
            />
          </div>

          {/* Series */}
          <div className={styles.formGroup}>
            <label htmlFor="series" className={styles.label}>
              Series
            </label>
            <input
              type="text"
              id="series"
              name="series"
              value={formData.series}
              onChange={handleChange}
              placeholder="e.g., DENYO SERIES"
              className={styles.input}
              disabled={isLoading}
              maxLength={100}
            />
          </div>

          {/* Capacity */}
          <div className={styles.formGroup}>
            <label htmlFor="capacity" className={styles.label}>
              Capacity *
            </label>
            <input
              type="text"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="e.g., 25KVA"
              className={styles.input}
              disabled={isLoading}
              required
              maxLength={50}
            />
          </div>

          {/* Category */}
          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.input}
              disabled={isLoading}
              required
            >
              <option value="">Select Category</option>
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className={styles.formGroup}>
            <label htmlFor="price" className={styles.label}>
              Price (Rs.) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="12499"
              className={styles.input}
              disabled={isLoading}
              required
              min="0"
              max="99999999"
            />
          </div>

          {/* Price Range */}
          <div className={styles.formGroup}>
            <label htmlFor="priceRange" className={styles.label}>
              Price Range
            </label>
            <input
              type="text"
              id="priceRange"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              placeholder="e.g., 10000-15000"
              className={styles.input}
              disabled={isLoading}
              maxLength={50}
            />
          </div>

          {/* Fuel Type */}
          <div className={styles.formGroup}>
            <label htmlFor="fuelType" className={styles.label}>
              Fuel Type
            </label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className={styles.input}
              disabled={isLoading}
            >
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Gas">Gas</option>
            </select>
          </div>

          {/* Status */}
          <div className={styles.formGroup}>
            <label htmlFor="status" className={styles.label}>
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={styles.input}
              disabled={isLoading}
            >
              <option value="IN STOCK">In Stock</option>
              <option value="OUT OF STOCK">Out of Stock</option>
              <option value="PRE ORDER">Pre Order</option>
            </select>
          </div>

          {/* Rating */}
          <div className={styles.formGroup}>
            <label htmlFor="rating" className={styles.label}>
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              className={styles.input}
              disabled={isLoading}
            />
          </div>

          {/* Image Upload */}
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="image" className={styles.label}>
              Product Image (Optional)
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.input}
              disabled={isLoading}
            />
            {imagePreview && (
              <div className={styles.imagePreview}>
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          {/* Description */}
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description..."
              className={styles.textarea}
              rows="4"
              disabled={isLoading}
              maxLength={5000}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isLoading}>
          {isLoading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

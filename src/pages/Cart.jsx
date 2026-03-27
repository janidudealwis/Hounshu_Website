import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import ScrollReveal from "../components/ScrollReveal";
import SuccessModal from "../components/SuccessModal";
import { LenisProvider } from "../context/LenisContext";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";
import { sanitizeInput, isValidPhone, isValidLength } from "../utils/security";
import styles from "./Cart.module.css";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheckout = async () => {
    // Enhanced Validation
    if (!isValidLength(customerName, 2, 100)) {
      alert("Please enter a valid name (2-100 characters)");
      return;
    }
    if (!isValidPhone(phoneNumber)) {
      alert("Please enter a valid phone number (10-15 digits)");
      return;
    }

    setIsLoading(true);

    try {
      // Sanitize inputs
      const sanitizedName = sanitizeInput(customerName.trim());
      const sanitizedPhone = sanitizeInput(phoneNumber.trim());

      // Calculate totals
      const subtotal = getTotalPrice();
      const tax = subtotal * 0.1;
      const shipping = subtotal > 10000 ? 0 : 500;
      const total = subtotal + tax + shipping;

      // 1. Insert order into orders table
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            customer_name: sanitizedName,
            phone: sanitizedPhone,
            subtotal: subtotal,
            tax: Math.round(tax),
            total: Math.round(total),
          },
        ])
        .select("id");

      if (orderError) throw new Error(orderError.message);

      const orderId = orderData[0].id;

      // 2. Insert order items into order_items table
      const orderItems = cartItems.map((item) => ({
        order_id: orderId,
        product_id: item.id,
        product_name: sanitizeInput(item.name),
        price: item.price,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw new Error(itemsError.message);

      // 3. Generate WhatsApp message with sanitized data
      const itemsList = cartItems
        .map((item) => `• ${sanitizeInput(item.name)} × ${item.quantity}`)
        .join("\n");

      const message = `🧾 HONSHU ENTERPRISES QUOTE REQUEST

Order ID: ${orderId}

Items:
${itemsList}

Subtotal: $${subtotal.toLocaleString()}
Tax: $${Math.round(tax).toLocaleString()}
Total: $${Math.round(total).toLocaleString()}`;

      // 4. Encode message
      const encodedMessage = encodeURIComponent(message);

      // 5. Clear cart after successful order
      clearCart();

      // 6. Get WhatsApp phone from environment variable
      const whatsappPhone =
        import.meta.env.VITE_WHATSAPP_PHONE || "94701400093";

      // 7. Open WhatsApp
      const whatsappURL = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;
      window.open(whatsappURL, "_blank");

      // Reset form
      setShowCheckoutForm(false);
      setCustomerName("");
      setPhoneNumber("");

      // Show success modal
      setSuccessMessage(
        `Order ${orderId} created successfully! WhatsApp is opening...`,
      );
      setShowSuccessModal(true);
    } catch (error) {
      alert(`Error processing order: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <LenisProvider>
        <ScrollProgress />
        <Navbar />
        <main className={styles.pageWrapper}>
          <ScrollReveal direction="up" delay={0.2}>
            <div className={styles.emptyCart}>
              <ScrollReveal direction="scale" delay={0.4}>
                <div className={styles.emptyIcon}>🛒</div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.6}>
                <h1>Your Cart is Empty</h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.8}>
                <p>Looks like you haven't added any products yet.</p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1.0}>
                <button
                  className={styles.continueBtn}
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </button>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </main>
        <Footer />
      </LenisProvider>
    );
  }

  const totalPrice = getTotalPrice();
  const subtotal = totalPrice;
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal + tax + shipping;

  return (
    <LenisProvider>
      <ScrollProgress />
      <Navbar />

      <main className={styles.pageWrapper}>
        <ScrollReveal direction="fade" delay={0.2}>
          <div className={styles.container}>
            <ScrollReveal direction="up" delay={0.4}>
              <h1 className={styles.pageTitle}>Shopping Cart</h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <div className={styles.cartLayout}>
                {/* Cart Items */}
                <ScrollReveal direction="left" delay={0.8}>
                  <div className={styles.cartItems}>
                    {cartItems.map((item, index) => (
                      <ScrollReveal
                        key={item.id}
                        direction="up"
                        delay={1.0 + (index * 0.1)}
                        duration={0.4}
                      >
                        <div className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemSeries}>{item.series}</p>
                    <p className={styles.itemPrice}>
                      ${item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className={styles.itemQuantity}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.itemTotal}>
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                    title="Remove from cart"
                  >
                    ✕
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        {/* Order Summary */}
        <ScrollReveal direction="right" delay={0.8}>
              <div className={styles.orderSummary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRow}>
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Tax (10%)</span>
                <span>${tax.toFixed(0).toLocaleString()}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>
                  Shipping
                  {shipping === 0 && (
                    <span className={styles.free}> (FREE)</span>
                  )}
                </span>
                <span>${shipping.toLocaleString()}</span>
              </div>

              <div className={styles.divider}></div>

              <div className={styles.summaryRow + " " + styles.total}>
                <span>Total</span>
                <span>${total.toFixed(0).toLocaleString()}</span>
              </div>

              {!showCheckoutForm ? (
                <button
                  className={styles.checkoutBtn}
                  onClick={() => setShowCheckoutForm(true)}
                >
                  Proceed to Checkout
                </button>
              ) : (
                <div className={styles.checkoutForm}>
                  <h3>Billing Information</h3>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    disabled={isLoading}
                    required
                    minLength={2}
                    maxLength={100}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isLoading}
                    required
                    minLength={10}
                    maxLength={15}
                    pattern="[0-9+\s\-\(\)]+"
                  />
                  <button
                    className={styles.submitBtn}
                    onClick={handleCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Complete Order"}
                  </button>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => {
                      setShowCheckoutForm(false);
                      setCustomerName("");
                      setPhoneNumber("");
                    }}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              )}

              <button
                className={styles.continueShoppingBtn}
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>

              <button className={styles.clearCartBtn} onClick={clearCart}>
                Clear Cart
              </button>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
        </div>
      </ScrollReveal>
    </main>

      <Footer />
      <SuccessModal
        isOpen={showSuccessModal}
        message={successMessage}
        onClose={() => setShowSuccessModal(false)}
      />
    </LenisProvider>
  );
};

export default Cart;

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import SuccessModal from "../components/SuccessModal";
import { LenisProvider } from "../context/LenisContext";
import styles from "./Contact.module.css";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    serviceInterest: "Industrial Construction",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName.trim()) {
      alert("Please enter your first name");
      return;
    }
    if (!formData.lastName.trim()) {
      alert("Please enter your last name");
      return;
    }
    if (!formData.email.trim()) {
      alert("Please enter your email address");
      return;
    }
    if (!formData.message.trim()) {
      alert("Please enter a message");
      return;
    }

    setIsSubmitting(true);

    try {
      // Format message for WhatsApp
      const message = `📧 CONTACT INQUIRY

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Service Interest: ${formData.serviceInterest}

Message:
${formData.message}`;

      // Encode message
      const encodedMessage = encodeURIComponent(message);

      // Open WhatsApp
      const whatsappURL = `https://wa.me/94701400093?text=${encodedMessage}`;
      window.open(whatsappURL, "_blank");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        serviceInterest: "Industrial Construction",
        message: "",
      });

      // Show success modal
      setSuccessMessage(
        "Message sent via WhatsApp! Our team will get back to you soon.",
      );
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LenisProvider>
      <ScrollProgress />
      <main className={styles.pageWrapper}>
        <div className={styles.glowTop}></div>
        <div className={styles.glowMiddle}></div>
        <div className={styles.glowBottom}></div>

        <Navbar />

        <div className={styles.container}>
          {/* Hero Section */}
          <section className={styles.heroSection}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Let's Build the <span className={styles.highlight}>Future</span>{" "}
                Together.
              </h1>
              <p className={styles.heroDesc}>
                Our global engineering team is ready to scale your industrial
                infrastructure. Reach out for a consultation.
              </p>

              {/* Contact Info */}
              <div className={styles.contactInfo}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📍</div>
                  <div className={styles.infoContent}>
                    <h4>ADDRESS</h4>
                    <p>No. 215, 231, Puttalam Road, Kurunegala, Sri Lanka</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📱</div>
                  <div className={styles.infoContent}>
                    <h4>PHONE</h4>
                    <p>
                      +94 37 22 24 717
                      <br />
                      +94 37 46 90 349
                      <br />
                      +94 37 22 22 777
                      <br />
                      +94 37 22 22 154
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>✉️</div>
                  <div className={styles.infoContent}>
                    <h4>EMAIL</h4>
                    <p>
                      honshu7@sltnet.lk
                      <br />
                      honshu7@yahoo.com
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📠</div>
                  <div className={styles.infoContent}>
                    <h4>FAX</h4>
                    <p>+94 37 22 25 314</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <h2>Send us a Message</h2>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Kanji"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Sato"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="k-sato@enterprise.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="serviceInterest">Service Interest</label>
                <select
                  id="serviceInterest"
                  name="serviceInterest"
                  value={formData.serviceInterest}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                >
                  <option>Industrial Construction</option>
                  <option>Power Generation</option>
                  <option>Equipment Rental</option>
                  <option>Maintenance Services</option>
                  <option>Consultation</option>
                  <option>Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <span className={styles.arrow}>➜</span>
              </button>
            </form>
          </section>
        </div>

        <Footer />
      </main>
      <SuccessModal
        isOpen={showSuccessModal}
        message={successMessage}
        onClose={() => setShowSuccessModal(false)}
      />
    </LenisProvider>
  );
}

export default Contact;

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import ScrollReveal from "../components/ScrollReveal";
import SuccessModal from "../components/SuccessModal";
import { LenisProvider } from "../context/LenisContext";
import { sanitizeInput, isValidEmail, isValidLength } from "../utils/security";
import styles from "./Contact.module.css";
import SEO from "../components/SEO";
import useScrollToTop from "../hooks/useScrollToTop";

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

  useScrollToTop();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidLength(formData.firstName, 2, 50)) {
      alert("First name must be between 2 and 50 characters");
      return;
    }
    if (!isValidLength(formData.lastName, 2, 50)) {
      alert("Last name must be between 2 and 50 characters");
      return;
    }
    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (!isValidLength(formData.message, 10, 2000)) {
      alert("Message must be between 10 and 2000 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const sanitizedFirstName = sanitizeInput(formData.firstName.trim());
      const sanitizedLastName = sanitizeInput(formData.lastName.trim());
      const sanitizedEmail = sanitizeInput(formData.email.trim());
      const sanitizedMessage = sanitizeInput(formData.message.trim());
      const sanitizedService = sanitizeInput(formData.serviceInterest);

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "contact",
            firstName: sanitizedFirstName,
            lastName: sanitizedLastName,
            email: sanitizedEmail,
            serviceInterest: sanitizedService,
            message: sanitizedMessage,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to send");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        serviceInterest: "Industrial Construction",
        message: "",
      });

      setSuccessMessage("Message sent! Our team will get back to you soon.");
      setShowSuccessModal(true);
    } catch (error) {
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LenisProvider>
      <SEO
        title="Contact Us"
        description="Get in touch with Honshu Enterprises for inquiries about industrial generators, forklifts, excavators and other heavy equipment in Sri Lanka. We're here to help."
        canonical="/contact"
      />
      <ScrollProgress />
      <main className={styles.pageWrapper}>
        <div className={styles.glowTop}></div>
        <div className={styles.glowMiddle}></div>
        <div className={styles.glowBottom}></div>

        <Navbar />

        <div className={styles.container}>
          <ScrollReveal direction="up" delay={0.2}>
            <section className={styles.contactSection}>
              {/* Left Side - Hero Content + Contact Information */}
              <ScrollReveal direction="left" delay={0.4}>
                <div className={styles.leftContent}>
                  {/* Hero Content */}
                  <div className={styles.heroContent}>
                    <ScrollReveal direction="up" delay={0.5}>
                      <p className={styles.eyebrow}>Get In Touch</p>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={0.6}>
                      <h1 className={styles.heroTitle}>
                        Let's Build the <span className={styles.highlight}>Future</span>{" "}
                        Together.
                      </h1>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={0.8}>
                      <p className={styles.heroDesc}>
                        Our global engineering team is ready to scale your industrial
                        infrastructure. Reach out for a consultation.
                      </p>
                    </ScrollReveal>
                  </div>

                  {/* Contact Information */}
                  <div className={styles.contactInfo}>

                    {/* ── Japan Office ── */}
                    <ScrollReveal direction="up" delay={1.0}>
                      <p className={styles.officeLabel}>Japan Office</p>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={1.1}>
                      <div className={styles.infoItem}>
                        <div className={styles.infoIcon}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                        </div>
                        <div className={styles.infoContent}>
                          <h4>ADDRESS</h4>
                          <p>
                            〒672-8079, Hyogo Prefecture, Himeji City,<br />
                            Shikama Ward, Imazaike 1405-1<br />
                            Casa Nishishikama 203, JAPAN<br />
                            220-10 Daijuji, Kamioka-cho, Tatsuno City
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={1.2}>
                      <div className={styles.infoItem}>
                        <div className={styles.infoIcon}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                        </div>
                        <div className={styles.infoContent}>
                          <h4>PHONE & FAX</h4>
                          <p>
                            Tel: +81 79 280 7650<br />
                            Fax: +81 79 280 7651<br />
                            Hotline: +81 70-8507-1077<br />
                            +94 77-273 33149<br />
                            +81 70-1748 8956
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={1.3}>
                      <div className={styles.infoItem}>
                        <div className={styles.infoIcon}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                          </svg>
                        </div>
                        <div className={styles.infoContent}>
                          <h4>EMAIL</h4>
                          <p>honshuenterprisescoltd@gmail.com</p>
                        </div>
                      </div>
                    </ScrollReveal>

                    {/* ── Sri Lanka Office ── */}
                    <ScrollReveal direction="up" delay={1.4}>
                      <p className={`${styles.officeLabel} ${styles.officeLabelGap}`}>Sri Lanka Office</p>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={1.5}>
                      <div className={styles.infoItem}>
                        <div className={styles.infoIcon}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                        </div>
                        <div className={styles.infoContent}>
                          <h4>ADDRESS</h4>
                          <p>No. 215, 231, Puttalam Road, Kurunegala, Sri Lanka</p>
                        </div>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={1.6}>
                      <div className={styles.infoItem}>
                        <div className={styles.infoIcon}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                        </div>
                        <div className={styles.infoContent}>
                          <h4>PHONE & FAX</h4>
                          <p>
                            +94 37 22 24 717<br />
                            +94 37 46 90 349<br />
                            +94 37 22 22 777<br />
                            +94 37 22 22 154<br />
                            Fax: +94 37 22 25 314
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={1.7}>
                      <div className={styles.infoItem}>
                        <div className={styles.infoIcon}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                          </svg>
                        </div>
                        <div className={styles.infoContent}>
                          <h4>EMAIL</h4>
                          <p>
                            honshu7@sltnet.lk<br />
                            honshu7@yahoo.com
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>

                  </div>
                </div>
              </ScrollReveal>

              {/* Right Side - Contact Form */}
              <ScrollReveal direction="right" delay={0.6}>
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                  <ScrollReveal direction="up" delay={0.8}>
                    <div className={styles.formHeader}>
                      <h2>Send us a Message</h2>
                      <p className={styles.formSubtitle}>We'll get back to you within 24 hours.</p>
                    </div>
                  </ScrollReveal>

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
                        required
                        minLength={2}
                        maxLength={50}
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
                        required
                        minLength={2}
                        maxLength={50}
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
                      required
                      maxLength={100}
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
                      required
                      minLength={10}
                      maxLength={2000}
                    />
                  </div>

                  <ScrollReveal direction="up" delay={1.0}>
                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <span className={styles.arrow}>➜</span>
                    </button>
                  </ScrollReveal>
                </form>
              </ScrollReveal>
            </section>
          </ScrollReveal>
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

import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SuccessModal from "./SuccessModal";
import styles from "./CTA.module.css";

const EDGE_FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`;

const CTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(EDGE_FN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "cta", email: email.trim() }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setEmail("");
      setShowSuccessModal(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className={styles.section}>
        <ScrollReveal direction="up" delay={0.2}>
          <div className={styles.container}>
            <ScrollReveal direction="scale" delay={0.4}>
              <div className={styles.card}>
                <div className={styles.glow} />
                <div className={styles.content}>
                  <ScrollReveal direction="up" delay={0.6}>
                    <h2 className={styles.title}>Ready to Upgrade Your Operations?</h2>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={0.8}>
                    <p className={styles.desc}>
                      Join thousands of global companies that trust Honshu for their
                      most demanding projects.
                    </p>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={1.0}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                      <input
                        type="email"
                        placeholder="Enter your business email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        required
                        disabled={isSubmitting}
                      />
                      <button className={styles.btn} type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Get Started"}
                      </button>
                    </form>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </section>

      <SuccessModal
        isOpen={showSuccessModal}
        message="Thanks! We'll be in touch with you soon."
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
};

export default CTA;

import React, { useEffect } from "react";
import styles from "./SuccessModal.module.css";

const SuccessModal = ({ isOpen, message, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.successIcon}>✓</div>
        <h2 className={styles.title}>Success!</h2>
        <p className={styles.message}>{message}</p>
        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;

import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import styles from "../style/footer.module.css"; // Importamos el CSS Module

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerItem}>
                    <FaPhoneAlt className={styles.footerIcon} />
                    <span>098 710 730</span>
                </div>
                <div className={styles.footerItem}>
                    <FaEnvelope className={styles.footerIcon} />
                    <span>prevanfer@gmail.com</span>
                </div>
                <div className={styles.footerItem}>
                    <FaMapMarkerAlt className={styles.footerIcon} />
                    <span>Tacuarembó, Uruguay</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

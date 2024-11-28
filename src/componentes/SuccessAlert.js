import React from "react";
import styles from "../style/SuccessAlert.module.css";

const SuccessAlert = ({ message, onClose }) => {
    return (
        <div className={styles.successAlert}>
            <span>{message}</span>
            <button className={styles.closeButton} onClick={onClose}>
                &times;
            </button>
        </div>
    );
};

export default SuccessAlert;

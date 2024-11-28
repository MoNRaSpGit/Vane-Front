import React from "react";
import styles from "../style/acidente.module.css"; // Importa el CSS Module

const InputField = ({ id, label, type, value, onChange, readOnly, options = [] }) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className={styles["acidente-label"]}>{label}</label>
            {type === "textarea" ? (
                <textarea
                    id={id}
                    className="form-control"
                    rows="3"
                    value={value}
                    onChange={(e) => onChange(id, e.target.value)}
                    readOnly={readOnly}
                />
            ) : type === "select" ? (
                <select
                    id={id}
                    className="form-control"
                    value={value}
                    onChange={(e) => onChange(id, e.target.value)}
                    disabled={readOnly}
                >
                    <option value="">Seleccione una opción</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={id}
                    type={type}
                    className="form-control"
                    style={{ backgroundColor: "#d6d6d6" }} // Gris oscuro
                    value={value}
                    onChange={(e) => onChange(id, e.target.value)}
                    readOnly={readOnly}
                />
            )}
        </div>
    );
};

export default InputField;

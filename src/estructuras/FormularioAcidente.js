import React, { useEffect } from "react";
import RowAcidente from "./RowAcidente";
import logoVane from "../assest/logoVane.png";
import InputField from "./InputField"; // Asegúrate de importar el componente genérico
import styles from "../style/acidente.module.css"; // Importamos el CSS Module

const FormularioAcidente = ({ formData, onChange, readOnly }) => {
    useEffect(() => {
        const today = new Date();
        const currentDate = today.toISOString().split("T")[0]; // Formato "YYYY-MM-DD"
        const currentTime = today.toTimeString().split(" ")[0].slice(0, 5); // Formato "HH:MM"

        if (!formData["fecha-accidente"]) {
            onChange("fecha-accidente", currentDate);
        }
        if (!formData["hora"]) {
            onChange("hora", currentTime);
        }
        if (!formData["fecha-investigacion"]) {
            onChange("fecha-investigacion", currentDate);
        }
        if (!formData["fecha-firma"]) {
            onChange("fecha-firma", currentDate);
        }
    }, [formData, onChange]);

    return (
        <div className="container mt-4">
            {/* Encabezado con título y logo */}
            <div className="d-flex align-items-center justify-content-center position-relative mb-5">
                <h2 className="mb-0 text-center">Informe de Investigación de Accidentes</h2>
                <img
                    src={logoVane}
                    alt="Logo Vane"
                    style={{
                        height: "100px",
                        position: "absolute",
                        right: 0,
                        borderRadius: "50%",
                        padding: "5px"
                    }}
                />
            </div>

            {/* Encabezado del formulario */}
            <div className="form-group border rounded p-3 mb-4 "              

                >
                {RowAcidente.slice(0, 3).map((field, index) => {
                    if (field.group) {
                        return (
                            <div className="row mb-3" key={index}>
                                {field.group.map((subField) => (
                                    <div className="col-md-6" key={subField.id}>
                                        <InputField
                                            id={subField.id}
                                            label={subField.label}
                                            type={subField.type}
                                            value={formData[subField.id] || ""}
                                            onChange={onChange}
                                            readOnly={readOnly}
                                        />
                                    </div>
                                ))}
                            </div>
                        );
                    } else {
                        return (
                            <InputField
                                key={field.id}
                                id={field.id}
                                label={field.label}
                                type={field.type}
                                value={formData[field.id] || ""}
                                onChange={onChange}
                                readOnly={readOnly}
                            />
                        );
                    }
                })}
            </div>

            {/* Cuerpo del Formulario */}
            <div className="form-group border rounded p-3 mb-4 text-start">
                {RowAcidente.slice(3, -3).map((field, index) => {
                    if (field.group) {
                        return (
                            <div className="row mb-3" key={index}>
                                {field.group.map((subField) => (
                                    <div className="col-md-6" key={subField.id}>
                                        <InputField
                                            id={subField.id}
                                            label={subField.label}
                                            type={subField.type}
                                            value={formData[subField.id] || ""}
                                            onChange={onChange}
                                            readOnly={readOnly}
                                            options={subField.options || []}
                                        />
                                    </div>
                                ))}
                            </div>
                        );
                    } else {
                        return (
                            <InputField
                                key={field.id}
                                id={field.id}
                                label={field.label}
                                type={field.type}
                                value={formData[field.id] || ""}
                                onChange={onChange}
                                readOnly={readOnly}
                                options={field.options || []}
                            />
                        );
                    }
                })}
            </div>

            {/* Sección de Firma */}
            <div className="form-group border rounded p-3"                 
            >
                {RowAcidente.slice(-3).map((field) => (
                    <InputField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        type={field.type}
                        value={formData[field.id] || ""}
                        onChange={onChange}
                        readOnly={readOnly}
                    />
                ))}
            </div>
        </div>
    );
};

export default FormularioAcidente;

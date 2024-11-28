import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import botiquinRow from "../estructuras/BotiquinRow";
import logoVane from "../assest/logoVane.png";
import styles from "../style/botiquin.module.css";

const FormularioBotiquin = ({ formData, onChange, readOnly, headerData, onHeaderChange }) => {
    const months = [
        "Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5",
        "Mes 6", "Mes 7", "Mes 8", "Mes 9", "Mes 10",
        "Mes 11", "Mes 12"
    ];

    const year = headerData.fecha ? new Date(headerData.fecha).getFullYear() : new Date().getFullYear();

    const handleCellClick = (id) => {
        const currentValue = formData[id] || "";
        const newValue = currentValue === "ok" ? "incorrecto" : currentValue === "incorrecto" ? "" : "ok";
        onChange(id, newValue);
    };

    return (
        <div className={`${styles.botiquinContainer} container mt-4`}
       
        >
            {/* Encabezado con título y logo */}
            <div className="row align-items-center mb-3">
                <div className="col text-end">
                    <h2 className="mb-0" style={{ marginRight: "322px" }}>Control de Botiquines</h2>
                </div>
                <div className="col-auto">
                    {/* Logo */}
                    <img
                        src={logoVane}
                        alt="Logo Vane"
                        style={{
                            width: "120px",
                            height: "80px",
                            borderRadius: "50%",
                            
                        }}
                    />
                </div>
            </div>

            {/* Encabezado de formulario */}
            <div className="row mb-3">
                <div className="col">
                    <label>Responsable:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="responsable"
                        value={headerData.responsable}
                        onChange={onHeaderChange}
                        readOnly={readOnly}
                    />
                </div>
                <div className="col">
                    <label>Fecha:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="fecha"
                        value={headerData.fecha}
                        onChange={onHeaderChange}
                        readOnly={readOnly}
                    />
                </div>
            </div>

            {/* Tabla principal */}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th className="text-center" style={{ width: "20%" }}>{year}</th>
                            {months.map((month, index) => (
                                <th key={index} className="text-center">{month}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {botiquinRow[0].subItems.map((subItem, index) => (
                            <tr key={index}>
                                <td className="text-center">{subItem.label}</td>
                                {months.map((month, monthIndex) => {
                                    const cellId = `${subItem.id}-${month}`;
                                    const cellValue = formData[cellId];

                                    return (
                                        <td
                                            key={monthIndex}
                                            className="text-center"
                                            onClick={() => handleCellClick(cellId)}
                                            style={{
                                                cursor: "pointer",
                                                color: cellValue === "ok" ? "green" : cellValue === "incorrecto" ? "red" : "black",
                                                fontSize: "1.2em",
                                                lineHeight: "1",
                                                width: "40px",
                                                height: "40px"
                                            }}
                                        >
                                            {cellValue === "ok" ? "✔️" : cellValue === "incorrecto" ? "❌" : ""}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Observaciones */}
            <div className="mt-3">
                <label>Observaciones:</label>
                <textarea
                    className="form-control"
                    name="observaciones"
                    rows="3"
                    value={headerData.observaciones}
                    onChange={onHeaderChange}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
};

export default FormularioBotiquin;

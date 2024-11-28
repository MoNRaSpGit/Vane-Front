import React, { useEffect, useRef } from "react";
import rowData from "../estructuras/RowData";
import logoVane from "../assest/logoVane.png";
import { useSelector } from "react-redux";
import styles from "../style/control.module.css"; // Importamos el CSS Module

const FormularioEstructura = ({ formData, totals, onCellClick, onChange, readOnly, headerData, onHeaderChange }) => {
    const containerRef = useRef(null);
    const { empresaNombre } = useSelector((state) => state.empresa);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                document.activeElement.blur();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const indiceCO = totals?.totalCorrectos + totals?.totalIncorrectos > 0
        ? ((totals.totalCorrectos / (totals.totalCorrectos + totals.totalIncorrectos)) * 100).toFixed(2)
        : "0.00";

    const nombreEmpresa = headerData?.nombre_empresa || empresaNombre || "Nombre de la Empresa";

    return (
        <div ref={containerRef} className={styles.tableContainer}>
            {/* Encabezado */}
            <div className={styles.header}>
                <div className="row mb-3 align-items-center">
                    <div className="col">
                        <h3>{nombreEmpresa}</h3>
                    </div>
                    <div className="col text-end">
                        <div className={styles.formHeaderRight}>
                            <img src={logoVane} alt="Vane Logo" className={styles.formLogo} />
                            <div className={styles.formLogoDetails}>
                                <small className={styles.formLogoText}>
                                    sobre visita efectuada por el Técnico Prevencionista
                                </small>
                                <span className={styles.formLogoId}>012120</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inputs de encabezado */}
            <div className="row mb-2">
                <div className="col">
                    <label className={styles.labelHeader}>Obra:</label>
                    <input
                        type="text"
                        className={`form-control ${styles.inputHeader}`} // Aplica la clase del inputHeader
                        name="obra"
                        value={headerData.obra || ""}
                        onChange={onHeaderChange}
                        readOnly={readOnly}
                    />
                </div>
                <div className="col">
                    <label className={styles.labelHeader}>Núcleo / PU / AR / UP / Convenio:</label>
                    <input
                        type="text"
                        className={`form-control ${styles.inputHeader}`} // Aplica la clase del inputHeader
                        name="nucleo"
                        value={headerData.nucleo || ""}
                        onChange={onHeaderChange}
                        readOnly={readOnly}
                    />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <label className={styles.labelHeader}>Fecha:</label>
                    <input
                        type="date"
                        className={`form-control ${styles.inputHeader}`} // Aplica la clase del inputHeader
                        name="fecha"
                        value={headerData.fecha || ""}
                        onChange={onHeaderChange}
                        readOnly={readOnly}
                    />
                </div>
                <div className="col">
                    <label className={styles.labelHeader}>Hora:</label>
                    <input
                        type="time"
                        className={`form-control ${styles.inputHeader}`} // Aplica la clase del inputHeader
                        name="hora"
                        value={headerData.hora || ""}
                        onChange={onHeaderChange}
                        readOnly={readOnly}
                    />
                </div>
            </div>


            {/* Tabla */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className={styles.tableCell}>Ítem Principal</th>
                        <th className={styles.tableCell}>Ítem Secundario</th>
                        <th className={styles.tableCell}>Correctos</th>
                        <th className={styles.tableCell}>Total Correctos</th>
                        <th className={styles.tableCell}>Incorrectos</th>
                        <th className={styles.tableCell}>Total Incorrectos</th>
                    </tr>
                </thead>
                <tbody>
                    {rowData.map((row, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            {row.subItems.map((subItem, subIndex) => (
                                <tr key={subItem.id}>
                                    {/* Celda del ítem principal */}
                                    {subIndex === 0 && (
                                        <td
                                            rowSpan={row.subItems.length}
                                            className={styles.tableCell} // Clase CSS para los estilos
                                        >
                                            {row.itemPrincipal}
                                        </td>
                                    )}

                                    {/* Celda del subitem */}
                                    <td className={styles.tableCell}>
                                        {subItem.label}
                                    </td>

                                    {/* Celda de correctos */}
                                    <td className={styles.tableCell}>
                                        <input
                                            type="number"
                                            className={`form-control ${styles.inputCell}`}
                                            id={`${subItem.id}-correctos`}
                                            value={formData[`${subItem.id}-correctos`]?.value || ""}
                                            onClick={() => onCellClick && onCellClick(`${subItem.id}-correctos`, "correctos")}
                                            onChange={(e) => onChange(`${subItem.id}-correctos`, e.target.value)}
                                            readOnly={readOnly}
                                            style={{
                                                backgroundColor: formData[`${subItem.id}-correctos`]?.color || "#5c6b7a", // Fondo rojo al inicio
                                                textAlign: "center",
                                            }}
                                        />
                                    </td>

                                    {/* Celda vacía */}
                                    <td className={styles.tableCell}></td>

                                    {/* Celda de incorrectos */}
                                    <td className={styles.tableCell}>
                                        <input
                                            type="number"
                                            className={`form-control ${styles.inputCell}`}
                                            id={`${subItem.id}-incorrectos`}
                                            value={formData[`${subItem.id}-incorrectos`]?.value || ""}
                                            onClick={() => onCellClick && onCellClick(`${subItem.id}-incorrectos`, "incorrectos")}
                                            onChange={(e) => onChange(`${subItem.id}-incorrectos`, e.target.value)}
                                            readOnly={readOnly}
                                            style={{
                                                backgroundColor: formData[`${subItem.id}-incorrectos`]?.color || "#5c6b7a", // Fondo rojo al inicio
                                                textAlign: "center",
                                            }}
                                        />
                                    </td>

                                    {/* Celda vacía */}
                                    <td className={styles.tableCell}></td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}

                    {/* Fila de totales */}
                    <tr>
                        <td
                            colSpan="3"
                            className={`text-end ${styles.tableCell}`}
                        >
                            <strong>Total Correctos</strong>
                        </td>
                        <td className={styles.tableCell}>
                            <input
                                type="number"
                                className={`form-control ${styles.inputTotal}`} // Aplica la clase inputTotal para fondo rojo
                                value={totals.totalCorrectos || 0}
                                readOnly
                            />
                        </td>
                        <td className={`text-end ${styles.tableCell}`}>
                            <strong>Total Incorrectos</strong>
                        </td>
                        <td className={styles.tableCell}>
                            <input
                                type="number"
                                className={`form-control ${styles.inputTotal}`} // Aplica la clase inputTotal para fondo rojo
                                value={totals.totalIncorrectos || 0}
                                readOnly
                            />
                        </td>
                    </tr>

                    {/* Fila del índice CO */}
                    <tr>
                        <td
                            colSpan="4"
                            className={`text-end ${styles.tableCell}`}
                        >
                            <strong>Índice CO = (Total Correctos / Total General) x 100</strong>
                        </td>
                        <td
                            colSpan="2"
                            className={styles.tableCell}
                        >
                            <strong>CO = {indiceCO} %</strong>
                        </td>
                    </tr>

                    {/* Fila de observaciones */}
                    <tr>
                        <td colSpan="6" className={styles.tableCell}>
                            <label className={styles.labelHeader}>Observaciones a corregir:</label>
                            <textarea
                                className={`form-control ${styles.textareaHeader}`} // Aplica la clase textareaHeader
                                name="observaciones"
                                rows="3"
                                value={headerData.observaciones || ""}
                                onChange={onHeaderChange}
                                readOnly={readOnly}
                            />
                        </td>
                    </tr>

                </tbody>

            </table>
        </div>
    );
};

export default FormularioEstructura;

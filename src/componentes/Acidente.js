import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    updateItem,
    updateAcidenteFormData,
    resetAcidenteData,
} from "../reducers/AcidenteSlice";
import { calculateTotals, sendFormData, resetFormData } from "../reducers/formSlice";
import { resetBotiquinData } from "../reducers/botiquinSlice";
import FormularioAcidente from "../estructuras/FormularioAcidente";
import { useNavigate } from "react-router-dom";
import styles from "../style/acidente.module.css"; // Importamos el CSS Module

const Acidente = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.acidente.formData);
    const totals = useSelector((state) => state.form.totals);
    const [successMessage, setSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const handleChange = (id, value) => {
        dispatch(updateItem({ id, value }));
    };

    const handleSubmit = () => {
        dispatch(calculateTotals());
        dispatch(updateAcidenteFormData(formData));

        dispatch(sendFormData())
            .unwrap()
            .then(() => {
                setSuccessMessage(true);

                // Limpiar todos los formularios
                dispatch(resetFormData());
                dispatch(resetBotiquinData());
                dispatch(resetAcidenteData());
            })
            .catch((error) => {
                console.error("Error al enviar los formularios:", error);
            });
    };

    const handleReset = () => {
        setSuccessMessage(false); // Ocultar el mensaje de éxito
        navigate("/bienvenida"); // Redirige al componente Bienvenida
    };

    return (
        <div className={styles["acidente-container"]}>
            {successMessage ? (
                <div className={styles["acidente-alert"]}>
                    <p>Formulario enviado con éxito.</p>
                    <button className={styles["acidente-btn"]} onClick={handleReset}>
                        Volver al formulario
                    </button>
                </div>
            ) : (
                <>
                    <h1 className={styles["acidente-title"]}>Gestión de Accidentes</h1>
                    <div className={styles["acidente-form-container"]}>
                        <FormularioAcidente
                            formData={formData}
                            onChange={handleChange}
                            readOnly={false}
                        />
                    </div>
                    <button className={styles["acidente-btn"]} onClick={handleSubmit}>
                        Enviar Todos
                    </button>
                </>
            )}
        </div>
    );
};

export default Acidente;

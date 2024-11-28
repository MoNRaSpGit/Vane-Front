import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateItem,
  calculateTotalItems,
  updateHeader,
  updateBotiquinData,
} from "../reducers/botiquinSlice";
import { useNavigate } from "react-router-dom";
import FormularioBotiquin from "../estructuras/FormularioBotiquin";
import Footer from "../estructuras/Footer";
import styles from "../style/botiquin.module.css"; // Importamos el CSS Module

const Botiquin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.botiquin.formData);
  const headerData = useSelector((state) => state.botiquin.headerData);

  const handleNext = () => {
    dispatch(updateBotiquinData({ formData, headerData }));
    console.log("Datos guardados de Botiquín:", { formData, headerData });
    navigate("/acidente");
  };

  const handleChange = (id, value) => {
    dispatch(updateItem({ id, value }));
    dispatch(calculateTotalItems());
  };

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateHeader({ name, value }));
  };

  return (
    <div className={styles["botiquin-container"]}>
      <h1 className={styles["botiquin-title"]}>Gestión del Botiquín</h1>
      <p className={styles["botiquin-subtitle"]}>
        Realiza un control detallado de los elementos del botiquín
      </p>
      <FormularioBotiquin
        formData={formData}
        onChange={handleChange}
        readOnly={false}
        headerData={headerData}
        onHeaderChange={handleHeaderChange}
      />
      <div className="row mt-4">
        <div className="col text-center">
          <button
            type="button"
            className={styles["botiquin-btn"]}
            onClick={handleNext}
          >
            Siguiente: Accidente
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Botiquin;

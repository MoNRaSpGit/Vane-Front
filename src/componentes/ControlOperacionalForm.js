import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../reducers/formSlice";
import { useNavigate } from "react-router-dom";
import FormularioEstructura from "../estructuras/FormularioEstructura";

const ControlOperacionalForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authLog); // Obtener el usuario logueado
  
  const { empresaId, empresaNombre } = useSelector((state) => state.empresa); // Obtener ID y nombre de la empresa
  console.log("id en el controlOperaciona  " , empresaId);
  

  const [formData, setFormData] = useState({});
  const [totals, setTotals] = useState({
    totalCorrectos: 0,
    totalIncorrectos: 0,
  });
  const [headerData, setHeaderData] = useState({
    empresa_id: empresaId || "", // Usar el ID de la empresa desde Redux
    usuario_id: user.id, // ID de usuario dinámico
    empresa_nombre: empresaNombre || "",
    tipo_formulario_id: 1,
    obra: "",
    nucleo: "",
    fecha: new Date().toISOString().split("T")[0],
    hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    observaciones: "",
  });

  useEffect(() => {
    // Actualizar empresa_id en headerData cuando cambia empresaId en Redux
    setHeaderData((prev) => ({ ...prev, empresa_id: empresaId }));
  }, [empresaId]);

  const handleChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: { ...prev[id], value },
    }));
    calculateTotals();
  };

  const handleCellClick = (id, type) => {
    const color = type === "correctos" ? "#1b5e20" : "#7f1d1d";
    setFormData((prev) => ({
      ...prev,
      [id]: { ...prev[id], color },
    }));
    calculateTotals();
  };

  const calculateTotals = () => {
    let totalCorrectos = 0;
    let totalIncorrectos = 0;

    Object.entries(formData).forEach(([key, data]) => {
      const value = parseInt(data.value) || 0;
      if (key.includes("-correctos")) {
        totalCorrectos += value;
      } else if (key.includes("-incorrectos")) {
        totalIncorrectos += value;
      }
    });

    setTotals({ totalCorrectos, totalIncorrectos });
  };

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeaderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    dispatch(updateFormData({ formData, headerData, totals }));
    navigate("/botiquin");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Control Operacional de Seguridad</h2>
      <FormularioEstructura
        formData={formData}
        totals={totals}
        onCellClick={handleCellClick}
        onChange={handleChange}
        headerData={headerData}
        onHeaderChange={handleHeaderChange}
        readOnly={false}
      />
      <button type="button" className="btn btn-primary mt-4" onClick={handleNext}>
        Siguiente: Botiquín
      </button>
    </div>
  );
};

export default ControlOperacionalForm;

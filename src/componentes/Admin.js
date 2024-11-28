import React, { useState, useEffect } from "react";
import axios from "axios";
import FormularioBotiquin from "../estructuras/FormularioBotiquin";
import FormularioEstructura from "../estructuras/FormularioEstructura";
import FormularioAcidente from "../estructuras/FormularioAcidente";
import "../style/administrador.css"

const Admin = () => {
    const [empresas, setEmpresas] = useState([]); // Estado para almacenar empresas
    const [selectedEmpresa, setSelectedEmpresa] = useState("");
    const [selectedFecha, setSelectedFecha] = useState("");
    const [formData, setFormData] = useState([]);
    const [headerData, setHeaderData] = useState([]);
    const [totals, setTotals] = useState([]);
    const [botiquinData, setBotiquinData] = useState([]);
    const [acidenteData, setAcidenteData] = useState([]);
    const [isExpanded, setIsExpanded] = useState([true]);
    const [isEstructuraOpen, setIsEstructuraOpen] = useState([]);
    const [isBotiquinOpen, setIsBotiquinOpen] = useState([]);
    const [isAcidenteOpen, setIsAcidenteOpen] = useState([]);

    // Llama al endpoint de empresas al montar el componente
    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/getEmpresas");
                setEmpresas(response.data.empresas); // Almacena las empresas en el estado
            } catch (error) {
                console.error("Error al obtener las empresas:", error);
            }
        };
        fetchEmpresas();
    }, []);

    const fetchFormulariosFiltrados = async () => {
        if (!selectedEmpresa || !selectedFecha) return;
    
        try {
            const response = await axios.get("http://localhost:5000/api/getFormulariosFiltrados", {
                params: {
                    nombre_empresa: selectedEmpresa,
                    fecha: selectedFecha,
                },
            });
    
            const formularios = response.data.formularios;
    
            const formDataArray = [];
            const headerDataArray = [];
            const totalsArray = [];
            const botiquinDataArray = [];
            const acidenteDataArray = [];
    
            formularios.forEach((formulario) => {
                const { formularioPrincipal, subformularios } = formulario;
            
                formDataArray.push(formularioPrincipal.datos_formulario.campos);
                
                headerDataArray.push({
                    obra: formularioPrincipal.datos_formulario.encabezado.obra,
                    nucleo: formularioPrincipal.datos_formulario.encabezado.nucleo,
                    fecha: formularioPrincipal.datos_formulario.encabezado.fecha,
                    hora: formularioPrincipal.datos_formulario.encabezado.hora,
                    observaciones: formularioPrincipal.datos_formulario.observaciones,
                    nombre_empresa: formularioPrincipal.nombre_empresa,
                });
            
                totalsArray.push({
                    totalCorrectos: formularioPrincipal.datos_formulario.total_correctos,
                    totalIncorrectos: formularioPrincipal.datos_formulario.total_incorrectos,
                });
            
                botiquinDataArray.push({
                    campos: subformularios[2]?.campos || {},
                    headerData: subformularios[2]?.headerData || {}
                });
            
                acidenteDataArray.push(subformularios[3]?.campos || {});
            });
    
            setFormData(formDataArray);
            setHeaderData(headerDataArray);
            setTotals(totalsArray);
            setBotiquinData(botiquinDataArray);
            setAcidenteData(acidenteDataArray);
    
            setIsExpanded(new Array(formularios.length).fill(false));
            setIsEstructuraOpen(new Array(formularios.length).fill(false));
            setIsBotiquinOpen(new Array(formularios.length).fill(false));
            setIsAcidenteOpen(new Array(formularios.length).fill(false));
            
            console.log("Datos obtenidos de formularios:", response.data);
        } catch (error) {
            console.error("Error al obtener los formularios filtrados:", error);
        }
    };

    const handleEmpresaChange = (e) => setSelectedEmpresa(e.target.value);
    const handleFechaChange = (e) => setSelectedFecha(e.target.value);

    const toggleExpand = (index) => {
        const updatedExpandedState = new Array(formData.length).fill(false);
        updatedExpandedState[index] = !isExpanded[index];
        setIsExpanded(updatedExpandedState);
    };

    const toggleEstructuraOpen = (index) => {
        const updatedState = [...isEstructuraOpen];
        updatedState[index] = !updatedState[index];
        setIsEstructuraOpen(updatedState);
    };

    const toggleBotiquinOpen = (index) => {
        const updatedState = [...isBotiquinOpen];
        updatedState[index] = !updatedState[index];
        setIsBotiquinOpen(updatedState);
    };

    const toggleAcidenteOpen = (index) => {
        const updatedState = [...isAcidenteOpen];
        updatedState[index] = !updatedState[index];
        setIsAcidenteOpen(updatedState);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Admin Panel - Formularios</h2>
            

            {/* Filtro de Empresa y Fecha */}
            <div className="mb-4">
                <label htmlFor="empresaSelect" className="form-label">Seleccionar Empresa</label>
                <select
                    id="empresaSelect"
                    className="form-select"
                    value={selectedEmpresa}
                    onChange={handleEmpresaChange}
                >
                    <option value="">-- Selecciona una empresa --</option>
                    {empresas.map((empresa) => (
                        <option key={empresa.id} value={empresa.nombre_empresa}>
                            {empresa.nombre_empresa}
                        </option>
                    ))}
                </select>

                <label htmlFor="fechaSelect" className="form-label mt-3">Seleccionar Fecha</label>
                <input
                    type="date"
                    id="fechaSelect"
                    className="form-control"
                    value={selectedFecha}
                    onChange={handleFechaChange}
                />

                <button className="btn btn-primary mt-3" onClick={fetchFormulariosFiltrados}>
                    Filtrar Formularios
                </button>
            </div>

            {/* Mostrar todos los formularios recibidos */}
            {formData.map((data, index) => (
                <div key={index} className="mb-5">
                    <h3 className="text-center">Formulario Principal {index + 1}</h3>

                    <button
                        className="btn btn-secondary w-100 mb-3"
                        onClick={() => toggleExpand(index)}
                    >
                        {isExpanded[index] ? "Ocultar Detalles" : "Mostrar Detalles"}
                    </button>

                    {isExpanded[index] && (
                        <>
                            <button
                                className="btn btn-secondary w-100"
                                onClick={() => toggleEstructuraOpen(index)}
                            >
                                {isEstructuraOpen[index] ? "Ocultar Formulario Principal" : "Mostrar Formulario Principal"}
                            </button>
                            {isEstructuraOpen[index] && (
                                <FormularioEstructura
                                    formData={formData[index]}
                                    totals={totals[index]}
                                    headerData={headerData[index]}
                                    readOnly={true}
                                />
                            )}

                            <button
                                className="btn btn-secondary w-100 mt-4"
                                onClick={() => toggleBotiquinOpen(index)}
                            >
                                {isBotiquinOpen[index] ? "Ocultar Formulario Botiquín" : "Mostrar Formulario Botiquín"}
                            </button>
                            {isBotiquinOpen[index] && (
                                <FormularioBotiquin
                                    formData={botiquinData[index]?.campos}
                                    headerData={botiquinData[index]?.headerData || {}}
                                    readOnly={true}
                                />
                            )}

                            <button
                                className="btn btn-secondary w-100 mt-4"
                                onClick={() => toggleAcidenteOpen(index)}
                            >
                                {isAcidenteOpen[index] ? "Ocultar Formulario Accidente" : "Mostrar Formulario Accidente"}
                            </button>
                            {isAcidenteOpen[index] && (
                                <FormularioAcidente
                                    formData={acidenteData[index]}
                                    readOnly={true}
                                />
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Admin;

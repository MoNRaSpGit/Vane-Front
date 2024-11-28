import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Admin from "./Admin";
import ControlOperacionalForm from "./ControlOperacionalForm";
import WeatherInfo from "./WeatherInfo";
import { setEmpresaId } from "../reducers/empresaSlice";
import logoVane from "../assest/logoVane.png"; // Importa la imagen predeterminada
import styles from "../style/bienvenida.module.css"; // Importa el CSS Module

const Bienvenida = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authLog); // Extrae el usuario logueado
    const empresaId = useSelector((state) => state.empresa.empresaId);

    const [menuVisible, setMenuVisible] = useState(false);
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState("");
    const [userPhoto, setUserPhoto] = useState(null); // Estado para la foto del usuario

    const empresas = [
        { id: "1", nombre: "Mevir" },
        { id: "2", nombre: "Frigorífico" },
        { id: "3", nombre: "MoNRa Compani Asocieted" },
    ];

    // Alterna el estado del menú desplegable
    const toggleMenu = () => {
        setMenuVisible((prev) => !prev);
    };

    // Maneja la selección de una empresa
    const handleEmpresaSeleccion = (id, nombre) => {
        setEmpresaSeleccionada(nombre);
        setMenuVisible(false); // Cierra el menú tras seleccionar una opción
        dispatch(setEmpresaId({ id, nombre })); // Actualiza el estado global
    };

    // Maneja la carga de la foto del usuario
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUserPhoto(e.target.result); // Guarda la imagen en el estado
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles["bienvenida-container"]}>
            <h1 className={styles["bienvenida-title"]}>
                ¡Hola {user?.nombre_usuario || "Usuario"}! Nos alegra verte aquí.
            </h1>

           

            {/* Clima */}
           {/* <WeatherInfo/> */}

            {user && user.rol === "admin" ? (
                <div className={styles["admin-panel"]}>
                    <p className={styles["bienvenida-subtitle"]}>
                  
                    </p>
                    <Admin />
                </div>
            ) : (
                <div className={styles["user-panel"]}>
                    {/* Botón para abrir el menú */}
                    <button
                        className={styles["btn-toggle-menu"]}
                        onClick={toggleMenu}
                    >
                        {menuVisible ? "Cerrar Empresas" : "Seleccionar Empresa"}
                    </button>

                    {/* Menú desplegable */}
                    {menuVisible && (
                        <ul className={styles["custom-dropdown"]}>
                            {empresas.map((empresa) => (
                                <li
                                    key={empresa.id}
                                    onClick={() =>
                                        handleEmpresaSeleccion(empresa.id, empresa.nombre)
                                    }
                                    role="option"
                                    tabIndex={0}
                                    aria-selected={
                                        empresaSeleccionada === empresa.nombre
                                    }
                                >
                                    {empresa.nombre}
                                </li>
                            ))}
                        </ul>
                    )}

                    {empresaId && (
                        <div className={styles["animated-form"]}>
                            <ControlOperacionalForm
                                empresaSeleccionada={empresaSeleccionada}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Bienvenida;

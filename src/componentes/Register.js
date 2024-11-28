import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError, clearSuccessMessage } from "../reducers/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "../style/Register.module.css";
import SuccessAlert from "./SuccessAlert";

const Register = () => {
    const [nombre_usuario, setNombreUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("empleado");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector((state) => state.auth);

    const handleRegister = (e) => {
        e.preventDefault();
        if (!nombre_usuario || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        dispatch(registerUser({ nombre_usuario, password, rol }));
    };

    // Redirección después de un registro exitoso
    if (successMessage) {
        setTimeout(() => {
            dispatch(clearSuccessMessage());
            navigate("/"); // Redirige a la raíz (login)
        }, 2000); // Espera 2 segundos antes de redirigir
    }

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerCard}>
                <h2>Registro de Usuario</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="nombre_usuario" className="form-label">Nombre de Usuario</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre_usuario"
                            value={nombre_usuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rol" className="form-label">Rol</label>
                        <select
                            className="form-select"
                            id="rol"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                        >
                            <option value="empleado">Empleado</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Registrando..." : "Registrar"}
                    </button>
                </form>

                {/* Muestra el mensaje de error */}
                {error && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {error}
                        <button onClick={() => dispatch(clearError())} className="btn-close"></button>
                    </div>
                )}

                {/* Muestra el mensaje de éxito */}
                {successMessage && (
                    <SuccessAlert
                        message={successMessage}
                        onClose={() => dispatch(clearSuccessMessage())}
                    />
                )}
            </div>
        </div>
    );
};

export default Register;

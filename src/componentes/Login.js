import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../reducers/loginSlice";
import { useNavigate } from "react-router-dom";
import styles from "../style/login.module.css";


const Login = () => {
    const [nombre_usuario, setNombreUsuario] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Asegúrate de usar useNavigate correctamente
    const { loading, error, isAuthenticated } = useSelector((state) => state.authLog);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ nombre_usuario, password }));
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="nombre_usuario" className="form-label">
                            Nombre de Usuario
                        </label>
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
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Ingresando..." : "Iniciar Sesión"}
                    </button>
                </form>

                {error && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {error}
                        <button onClick={() => dispatch(clearError())} className="btn-close"></button>
                    </div>
                )}

                {isAuthenticated && (
                    <div className="alert alert-success mt-3" role="alert">
                        ¡Inicio de sesión exitoso!
                    </div>
                )}

                {/* Enlace para registrarse */}
                <div className={styles.registerSection}>
                    ¿No estás registrado?{" "}
                    <span
                        className={styles.registerLink}
                        onClick={() => navigate("/register")}
                    >
                        Regístrate aquí
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;

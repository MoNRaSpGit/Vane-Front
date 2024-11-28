import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate  } from "react-router-dom";
import ControlOperacionalForm from "./componentes/ControlOperacionalForm";
import Admin from "./componentes/Admin";
import Botiquin from "./componentes/Botiquin";
import Acidente from "./componentes/Acidente";
import Register from "./componentes/Register";
import Login from "./componentes/Login";
import Bienvenida from "./componentes/Bienvenida"; // Importamos Bienvenida
import { useSelector } from "react-redux";

function App() {
    const { isAuthenticated } = useSelector((state) => state.authLog); // Accedemos al estado de autenticación

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/bienvenida" /> : <Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/resultado" element={<Admin />} />
                    <Route path="/control-operacional" element={<ControlOperacionalForm />} />
                    <Route path="/botiquin" element={<Botiquin />} />
                    <Route path="/acidente" element={<Acidente />} />
                    <Route path="/bienvenida" element={<Bienvenida />} /> {/* Ruta para Bienvenida */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

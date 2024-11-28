// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import formReducer  from "../reducers/formSlice";
import botiquinReducer from "../reducers/botiquinSlice";
import AcidenteSlice from "../reducers/AcidenteSlice"; // Importa el nuevo slice
import authReducer from "../reducers/authSlice";
import loginReducer from "../reducers/loginSlice";
import empresaReducer from "../reducers/empresaSlice"; // Importa el reducer de empresa

// Configurar el store de Redux
const store = configureStore({
  reducer: {
    form: formReducer,
    botiquin: botiquinReducer,
    acidente: AcidenteSlice, // Añade el slice al store
    auth: authReducer,
    authLog: loginReducer,
    empresa: empresaReducer,
    
  },
});

export default store;


/*
import empresaReducer from "./empresaSlice"; // Importa el reducer de empresa

const store = configureStore({
    reducer: {
        empresa: empresaReducer, // Agrega el slice de empresa

*/



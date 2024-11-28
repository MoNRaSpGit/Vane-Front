// reducers/empresaSlice.js
import { createSlice } from "@reduxjs/toolkit";

const empresaSlice = createSlice({
    name: "empresa",
    initialState: {
        empresaId: "",
        empresaNombre: ""
    },
    reducers: {
        setEmpresaId: (state, action) => {
            const { id, nombre } = action.payload;
            state.empresaId = id;
            state.empresaNombre = nombre;
        }
    }
});

export const { setEmpresaId } = empresaSlice.actions;
export default empresaSlice.reducer;

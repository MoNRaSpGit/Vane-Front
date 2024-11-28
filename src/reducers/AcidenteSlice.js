// AcidenteSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formData: {},
};

const acidenteSlice = createSlice({
    name: "acidente",
    initialState,
    reducers: {
        updateItem: (state, action) => {
            const { id, value } = action.payload;
            state.formData[id] = value;
        },
        updateAcidenteFormData: (state, action) => {
            state.formData = action.payload;
        },
        resetAcidenteData: (state) => {
            state.formData = {};
        },
    },
});

export const { updateItem, updateAcidenteFormData, resetAcidenteData } = acidenteSlice.actions;
export default acidenteSlice.reducer;

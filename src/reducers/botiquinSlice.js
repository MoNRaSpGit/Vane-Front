// botiquinSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formData: {},
    headerData: {
        responsable: "",
        fecha: "",
        observaciones: ""
    },
    totals: {
        totalItems: 0,
    },
};

const botiquinSlice = createSlice({
    name: "botiquin",
    initialState,
    reducers: {
        updateItem: (state, action) => {
            const { id, value } = action.payload;
            state.formData[id] = value;
        },
        updateHeader: (state, action) => {
            const { name, value } = action.payload;
            state.headerData[name] = value;
        },
        updateBotiquinData: (state, action) => {
            const { formData, headerData } = action.payload;
            state.formData = formData;
            state.headerData = headerData;
        },
        calculateTotalItems: (state) => {
            state.totals.totalItems = Object.values(state.formData).filter(val => val === "ok").length;
        },
        resetBotiquinData: (state) => {
            state.formData = {};
            state.headerData = { responsable: "", fecha: "", observaciones: "" };
            state.totals = { totalItems: 0 };
        }
    },
});

export const { updateItem, updateHeader, updateBotiquinData, calculateTotalItems, resetBotiquinData } = botiquinSlice.actions;
export default botiquinSlice.reducer;

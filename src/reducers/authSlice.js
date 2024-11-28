import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk para el registro de usuario
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ nombre_usuario, password, rol }, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:5000/api/registrarUsuario", {
                nombre_usuario,
                password,
                rol
            });
            return response.data;
        } catch (error) {
            console.error("Error en el registro:", error);
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
                state.user = action.payload.userId;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            });
    },
});

export const { clearError, clearSuccessMessage } = authSlice.actions;
export default authSlice.reducer;

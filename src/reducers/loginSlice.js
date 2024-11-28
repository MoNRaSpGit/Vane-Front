import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk para manejar el login de usuario
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ nombre_usuario, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                nombre_usuario,
                password
            });
            return response.data;
        } catch (error) {
            console.error("Error en el login:", error);
            return rejectWithValue(error.response.data);
        }
    }
);

const loginSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            });
    },
});

export const { logout, clearError } = loginSlice.actions;
export default loginSlice.reducer;

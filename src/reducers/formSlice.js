import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  formData: {},
  headerData: {
    empresa_id: 1,
    usuario_id: 1,
  },
  totals: {
    totalCorrectos: 0,
    totalIncorrectos: 0,
  },
};

export const sendFormData = createAsyncThunk(
  "form/sendFormData",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const { form, botiquin, acidente } = state;

    const payload = {
      controlOperacional: {
        formData: form.formData,
        headerData: form.headerData,
        totals: form.totals,
      },
      botiquin: {
        formData: botiquin.formData,
        headerData: botiquin.headerData,
      },
      acidente: {
        formData: acidente.formData,
      },
      fechaEnvio: new Date().toISOString(),
    };

    console.log("Datos completos enviados al backend:", payload);

    try {
      const response = await axios.post("http://localhost:5000/api/saveForm", payload);
      console.log("Formulario guardado con éxito en el backend:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al guardar el formulario en el backend:", error);
      return rejectWithValue("Error al enviar los datos al servidor");
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateCell: (state, action) => {
      const { id, value, color } = action.payload || {};
      if (id) {
        state.formData[id] = {
          ...state.formData[id],
          value: value || state.formData[id]?.value,
          color: color || state.formData[id]?.color,
        };
      }
    },
    updateFormData: (state, action) => {
      const { formData, headerData, totals } = action.payload;
      state.formData = formData;
      state.headerData = headerData;
      state.totals = totals;
    },
    calculateTotals: (state) => {
      let totalCorrectos = 0;
      let totalIncorrectos = 0;
      Object.entries(state.formData).forEach(([key, data]) => {
        const value = parseInt(data.value) || 0;
        if (key.includes("-correctos")) {
          totalCorrectos += value;
        } else if (key.includes("-incorrectos")) {
          totalIncorrectos += value;
        }
      });
      state.totals.totalCorrectos = totalCorrectos;
      state.totals.totalIncorrectos = totalIncorrectos;
    },
    resetFormData: (state) => {
      state.formData = {};
      state.headerData = {
        empresa_id: 1,
        usuario_id: 1,
      };
      state.totals = {
        totalCorrectos: 0,
        totalIncorrectos: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendFormData.fulfilled, (state, action) => {
      console.log("Datos enviados correctamente:", action.payload);
    });
  },
});

export const { updateCell, updateFormData, calculateTotals, resetFormData } = formSlice.actions;
export default formSlice.reducer;
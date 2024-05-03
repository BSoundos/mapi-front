import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface GenerateAccessKeyState {
  accessKey: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: GenerateAccessKeyState = {
  accessKey: null,
  loading: false,
  error: null,
};
//générer une clé d'accées 
export const generateAccessKey = createAsyncThunk<string , {typeplan :string ,versionApiId: string, planId : string}>(
    'accessKey/generateAccessKey',
    async ({typeplan ,versionApiId , planId}) => {
      try {
        const response = await axios.post(`http://localhost:8000/payment/generate-accesskey/${typeplan}/${versionApiId}/${planId}/`);
        console.log("response.data", response.data.access_key);
        return response.data.access_key;
      } catch (error) {
        throw new Error('Failed to generate access key');
      }
    }
  );
  

const generateAccessKeySlice = createSlice({
  name: 'InfosaccessKey',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateAccessKey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateAccessKey.fulfilled, (state, action) => {
        state.loading = false;
        state.accessKey = action.payload;
      })
      .addCase(generateAccessKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to generate access key';
      });
  },
});

export default generateAccessKeySlice.reducer;

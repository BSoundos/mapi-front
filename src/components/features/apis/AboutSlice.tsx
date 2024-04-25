// apiSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';

export interface ApiData {
  id: number;
  name: string;
  description: string;
  votes: number;
  popularity: number;
  latency: number;
  service_level: number;
  category_name: string;
  // Autres propriétés...
}

interface ApiState {
  data: ApiData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchApiById = createAsyncThunk<
  ApiData,
  number
>(
  'api/fetchApiById', // Nom de l'action
  async (apiId: number) => {
    const response = await axios.get(`${BACKEND_BASE_URL}/apis_exploitation/api/${apiId}`);
    const data = response.data;
    return data;
  }
);

// Création d'un slice pour gérer l'état de l'API dans le store Redux
const AboutSlice = createSlice({
  name: 'api',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  } as ApiState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchApiById.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchApiById.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(fetchApiById.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

// Export du reducer
export default AboutSlice.reducer;

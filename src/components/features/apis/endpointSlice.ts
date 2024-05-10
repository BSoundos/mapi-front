import { BACKEND_BASE_URL } from '@/data/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEndpoints = createAsyncThunk(
  'endpoints/fetchEndpoints',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-all-endpoint-by-version/${id}/`, { headers });
      return response.data;
    } catch (error) {
      // If the error is from the server, return the error response data
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      // If the error is from the client-side, return the error message
      return rejectWithValue(error.message);
    }
  }
);

const endpointsSlice = createSlice({
  name: "endpoints",
  initialState: {
    endpoints: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEndpoints.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEndpoints.fulfilled, (state, action) => {
        state.loading = false;
        state.endpoints = action.payload;
        state.error = null; // Reset the error when the fetch is successful
      })
      .addCase(fetchEndpoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error payload
      });
  },
});

export default endpointsSlice.reducer;
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
export const fetchDataFormat = createAsyncThunk(
  'endpoints/fetchDataFormat',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-all-data-format/`, { headers });
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

export const addEndpoint = createAsyncThunk(
  'endpoint/addEndpoint',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Token ${token}` };
      const response = await axios.post(`${BACKEND_BASE_URL}/apis_management/add-endpoint/${id}/`, data, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const removeEndpoint = createAsyncThunk('endpoint/removeEndpoint', async ({versionId,endpintId}) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.delete(`${BACKEND_BASE_URL}/apis_management/delete-endpoint/${versionId}/${endpintId}/`, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to delete endpoint');
  }
});
export const getEndpoint = createAsyncThunk('endpoint/getEndpoint', async ({versionId,endpointId}) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/api-endpoint/${versionId}/${endpointId}/`, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to delete endpoint');
  }
});
export const updateEndpoint = createAsyncThunk('endpoint/updateEndpoint', async ({versionId,endpointId,data}) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.put(`${BACKEND_BASE_URL}/apis_management/update-api-endpoint/${versionId}/${endpointId}/`,data, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to delete endpoint');
  }
});

const endpointsSlice = createSlice({
  name: "endpoints",
  initialState: {
    endpoints: [],
    dataFormat:[],
    endpoint:{},
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
      })
      .addCase(addEndpoint.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEndpoint.fulfilled, (state, action) => {
        state.loading = false;
        state.endpoint = action.payload;
        state.error = null; // Reset the error when the fetch is successful
      })
      .addCase(addEndpoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error payload
      })
      .addCase(fetchDataFormat.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDataFormat.fulfilled, (state, action) => {
        state.loading = false;
        state.dataFormat = action.payload;
        state.error = null; // Reset the error when the fetch is successful
      })
      .addCase(fetchDataFormat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEndpoint.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEndpoint.fulfilled, (state, action) => {
        state.loading = false;
        state.endpoint = action.payload;
        state.error = null; 
      })
      .addCase(getEndpoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      .addCase(updateEndpoint.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEndpoint.fulfilled, (state, action) => {
        state.loading = false;
        state.endpoint = action.payload;
        state.error = null; 
      })
      .addCase(updateEndpoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      .addCase(removeEndpoint.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeEndpoint.fulfilled, (state, action) => {
        state.loading = false;
        state.endpoints = state.endpoints.filter((end) => end.endpoint_id !== action.meta.arg);
        state.error = null;
      })
      .addCase(removeEndpoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export default endpointsSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';


export const fetchFunctionalities = createAsyncThunk(
  'functionalities/fetchFunctionalities',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-all-functionalities`, { headers });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);
export const searchFunctionalities = createAsyncThunk(
  "functionalities/searchFunctionalities",
  async (query) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/search-functions/`, {headers,
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw Error(error.response?.data?.message || 'Failed to search functionalities');
    }
  }
);

export const deleteFunctionality = createAsyncThunk(
  'functionalities/deleteFunctionality',
  async ({ apiPk, functionalityPk }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.delete(
        `${BACKEND_BASE_URL}/apis_management/${apiPk}/functionalities/${functionalityPk}/remove/`,
        { headers }
      );

      if (response.status === 204) {
        return { apiPk, functionalityPk };
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

const functionalitiesSlice = createSlice({
  name: "functionalities",
  initialState: {
    functionalities: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFunctionalities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFunctionalities.fulfilled, (state, action) => {
        state.loading = false;
        state.functionalities = action.payload;
        state.error = null;
      })
      .addCase(fetchFunctionalities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(deleteFunctionality.fulfilled, (state, action) => {
        const { apiPk, functionalityPk } = action.payload;
        state.functionalities = state.functionalities.filter(
          (functionality) =>
            !(functionality.api === apiPk && functionality.pk === functionalityPk)
        );
      })
      .addCase(deleteFunctionality.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default functionalitiesSlice.reducer;
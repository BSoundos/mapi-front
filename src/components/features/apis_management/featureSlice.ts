import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';
const initialState = {
  features: [],
  feature: {},
  loading: false,
  error: null,
};


export const fetchAllFeaturesByVersion= createAsyncThunk(
    "feature/fetchAllfeaturesByVersion",
    async (versionId) => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-all-features-by-version/${versionId}`, { headers });
        return response.data;
      } catch (error) {
        throw Error(error.response.data.message || 'Failed to fetch features for version');
      }
    }
  );

export const getFeature = createAsyncThunk(
    "feature/getFeature",
    async (id) => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-feature/${id}/`, { headers });
        return response.data;
      } catch (error) {
        throw Error(error.response.data.message || 'Failed to fetch subscription plan');
      }
    }
  );

  
export const updateFeature = createAsyncThunk('feature/updateFeature', async ({ id, data }) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.put(`${BACKEND_BASE_URL}/apis_management/update-feature/${id}/`, data, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to update feature');
  }
});
export const addFeature = createAsyncThunk(
  'feature/addFeature',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Token ${token}` };
      const response = await axios.post(`${BACKEND_BASE_URL}/apis_management/add-feature/${id}/`, data, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeFeature = createAsyncThunk('feature/removeFeature', async (id) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.delete(`${BACKEND_BASE_URL}/apis_management/delete-feature/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to delete feature');
  }
});


const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFeaturesByVersion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFeaturesByVersion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.features = action.payload;
      })
      .addCase(fetchAllFeaturesByVersion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getFeature.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeature.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.feature = action.payload;
      })
      .addCase(getFeature.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(addFeature.pending, (state) => {
        state.loading = true;
        state.error = null;
      })       
      .addCase(addFeature.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          const newfeature = action.payload;
            state.features.push(newfeature);  
        })
      .addCase(addFeature.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateFeature.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFeature.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedfeature = action.payload;
        const index = state.features.findIndex((feature) => feature.id === updatedfeature.id);
        if (index !== -1) {
          state.features[index] = updatedfeature;
        }
      })
      .addCase(updateFeature.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(removeFeature.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFeature.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.features = state.features.filter((obj) => obj.id !== action.meta.arg);
      })
      .addCase(removeFeature.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
      
      
  },
});

export default featureSlice.reducer;

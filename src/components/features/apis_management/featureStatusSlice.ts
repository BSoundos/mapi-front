import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';

const initialState = {
  featuresSub: [],
  featuresUser: [],
  loading: false,
  error: null,
};



export const fetchAllFeaturesStatusForSub= createAsyncThunk(
    "featureStatus/fetchAllFeaturesStatusForSub",
    async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-feature-status-with-subscription/`, { headers });
        return response.data;
      } catch (error) {
        throw Error(error.response.data.message || 'Failed to fetch features for version');
      }
    }
  );
  export const fetchAllFeaturesStatusForUser= createAsyncThunk(
    "featureStatus/fetchAllFeaturesStatusForUser",
    async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-feature-status-with-user/`, { headers });
        return response.data;
      } catch (error) {
        throw Error(error.response.data.message || 'Failed to fetch features for version');
      }
    }
  );


  
  export const updateFeatureStatus = createAsyncThunk('featureStatus/updateFeatureStatus', async ({ id, data, planType }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.put(`${BACKEND_BASE_URL}/apis_management/update-feature-status/${id}/`, data, { headers });
      return {data:response.data, planType };
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to update feature');
    }
  });



const featureSlice = createSlice({
  name: 'featureStatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFeaturesStatusForSub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFeaturesStatusForSub.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.featuresSub = action.payload;
      })
      .addCase(fetchAllFeaturesStatusForSub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      }) 
      .addCase(fetchAllFeaturesStatusForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFeaturesStatusForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.featuresUser = action.payload;
      })
      .addCase(fetchAllFeaturesStatusForUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      }) 
      .addCase(updateFeatureStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFeatureStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { data, planType } = action.payload;
      
        if (planType === 'sub') {
          const featureSubIndex = state.featuresSub.findIndex(
            (feature) => feature.feature_id === data.feature
          );
          if (featureSubIndex !== -1) {
            const featureStatusIndex = state.featuresSub[featureSubIndex].feature_status.findIndex(
              (status) => status.id === data.id
            );
            if (featureStatusIndex !== -1) {
              state.featuresSub[featureSubIndex].feature_status[featureStatusIndex] = data;
            } else {
              state.featuresSub[featureSubIndex].feature_status.push(data);
            }
          }
        } else {
          const featureUserIndex = state.featuresUser.findIndex(
            (feature) => feature.feature_id === data.feature
          );
          if (featureUserIndex !== -1) {
            const featureStatusIndex = state.featuresUser[featureUserIndex].feature_status.findIndex(
              (status) => status.id === data.id
            );
            if (featureStatusIndex !== -1) {
              state.featuresUser[featureUserIndex].feature_status[featureStatusIndex] = data;
            } else {
              state.featuresUser[featureUserIndex].feature_status.push(data);
            }
          }
        }
      })
      .addCase(updateFeatureStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      
      
  },
});

export default featureSlice.reducer;

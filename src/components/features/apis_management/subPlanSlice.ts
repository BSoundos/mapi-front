import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';
const initialState = {
  subscriptionPlans: [],
  subscriptionPlan: {},
  loading: false,
  error: null,
};


export const fetchAllSubscriptionPlansByVersion= createAsyncThunk(
    "subscriptionPlan/fetchAllSubscriptionPlansByVersion",
    async (versionId) => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-all-sub-plans-by-version/${versionId}`, { headers });
        return response.data;
      } catch (error) {
        throw Error(error.response.data.message || 'Failed to fetch subscription plans for version');
      }
    }
  );

export const getSubscriptionPlan = createAsyncThunk(
    "subscriptionPlan/getSubscriptionPlan",
    async (id) => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/subscription-plans/${id}/`, { headers });
        return response.data;
      } catch (error) {
        throw Error(error.response.data.message || 'Failed to fetch subscription plan');
      }
    }
  );

  export const hideSubscriptionPlan = createAsyncThunk(
    "subscriptionPlan/hideSubscriptionPlan",
    async (id) => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.put(`${BACKEND_BASE_URL}/apis_management/hide-subscription-plan/${id}/`, {}, { headers });
        return response.data;
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          throw Error(error.response.data.message);
        } else {
          throw Error('Failed to hide subscription plan');
        }
      }
    }
  );
  export const activateSubscriptionPlan = createAsyncThunk(
    "subscriptionPlan/activateSubscriptionPlan",
    async (id) => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.put(`${BACKEND_BASE_URL}/apis_management/activate-subscription-plan/${id}/`, {}, { headers });
        return response.data;
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          throw Error(error.response.data.message);
        } else {
          throw Error('Failed to activate subscription plan');
        }
      }
    }
  );
  
  interface UpdateSubscriptionPlanPayload {
    id: number;
    data: {
      name: string;
      type: string;
      rate_limit: number | null;
      is_active: boolean;
      subscription_price: number;
      recommended: boolean;
    };
  }
  
  interface UpdateSubscriptionPlanResponse {
    id: number;
    name: string;
    type: string;
    rate_limit: number | null;
    is_active: boolean;
    api_version: number;
    subscription_price: number;
    recommended: boolean;
  }
  
  export const updateSubscriptionPlan = createAsyncThunk<
    UpdateSubscriptionPlanResponse,
    UpdateSubscriptionPlanPayload,
    { rejectValue: string }
  >('subscriptionPlan/updateSubscriptionPlan', async ({ id, data }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Token ${token}` };
      const response: AxiosResponse<UpdateSubscriptionPlanResponse> = await axios.put(
        `${BACKEND_BASE_URL}/apis_management/update-subscription-plan/${id}/`,
        data,
        { headers }
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to update subscription plan';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  });


const subscriptionPlanSlice = createSlice({
  name: 'subscriptionPlan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubscriptionPlansByVersion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubscriptionPlansByVersion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.subscriptionPlans = action.payload;
      })
      .addCase(activateSubscriptionPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.subscriptionPlan = action.payload;
        const updatedPlan = action.payload;
        state.subscriptionPlans = state.subscriptionPlans.map((plan) =>
          plan.id === updatedPlan.id ? updatedPlan : plan
        );
      })
      .addCase(hideSubscriptionPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.subscriptionPlan = action.payload;
        const updatedPlan = action.payload;
        state.subscriptionPlans = state.subscriptionPlans.map((plan) =>
          plan.id === updatedPlan.id ? { ...plan, is_active: false } : plan
        );
      })
      .addCase(hideSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(activateSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(fetchAllSubscriptionPlansByVersion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getSubscriptionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscriptionPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.subscriptionPlan = action.payload;
      })
      .addCase(getSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateSubscriptionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscriptionPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.subscriptionPlan = action.payload;
      })
      .addCase(updateSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
    
  },
});

export default subscriptionPlanSlice.reducer;

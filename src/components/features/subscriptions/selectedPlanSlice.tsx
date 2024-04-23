// selectedPlanSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ObjectItem {
  object_name: string;
  id: string;
  quota_type: string;
  quota_limit: number;
  limit_type: string;
  average_usage: number;
  }

interface PlanDetails {
  id: string;
  name: string;
  subscription_price: string;
  objects: ObjectItem[]; 
  rate_limit :  number;
  api_version : number ;
}

interface PlanState {
  details: PlanDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: PlanState = {
  details: null,
  loading: false,
  error: null,
};

export const fetchPlanDetails = createAsyncThunk<PlanDetails, { planId: string }>(
  'plans/fetchPlanDetails',
  async ({planId }) => {
    try {
      const response = await axios.get(`http://localhost:8000/payment/subscription-plan/${planId}/`);
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch plan details');
    }
  }
);

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlanDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchPlanDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch plan details';
      });
  },
});

export default planSlice.reducer;

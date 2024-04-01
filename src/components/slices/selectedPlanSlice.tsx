// selectedPlanSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ObjectItem {
  object_name: string;
  id: number;
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

export const fetchPlanDetails = createAsyncThunk(
  'plans/fetchPlanDetails',
  async (planId: string) => {
    const response = await axios.get(`http://localhost:8000/payment/api/plans/${planId}/`);
    console.log("response.data", response.data.plan_details)

    return response.data.plan_details;

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

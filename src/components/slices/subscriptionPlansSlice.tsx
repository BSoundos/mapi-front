import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ObjectItem {
  id: number;
  quota_type: string;
  quota_limit: number;
  limit_type: string;
  average_usage: number;
  object_name: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  subscription_price: number;
  rate_limit: number;
  objects: ObjectItem[]; 
}
interface SubscriptionPlansState {
  plans: SubscriptionPlan[];
  selectedPlan: SubscriptionPlan | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchSubscriptionPlans = createAsyncThunk<SubscriptionPlan[]>(
  'subscriptionPlans/fetchPlans',
  async () => {
    const response = await axios.get('http://localhost:8000/payment/api/plans/');
    return response.data.subscription_plans; 
  }
);
const subscriptionPlansSlice = createSlice({
  name: 'subscriptionPlans',
  initialState: {
    plans: [],
    selectedPlan: null,
    status: 'idle',
    error: null,
  } as SubscriptionPlansState, 
  reducers: {
    selectPlan(state, action: PayloadAction<SubscriptionPlan>) {
      state.selectedPlan = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionPlans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubscriptionPlans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plans = action.payload;
      })
      .addCase(fetchSubscriptionPlans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { selectPlan } = subscriptionPlansSlice.actions;

export default subscriptionPlansSlice.reducer;

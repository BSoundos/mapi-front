import { BACKEND_BASE_URL } from '@/data/constants';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ObjectItem {
  id: string;
  price: number;
  object_name: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  rate_limit: number;
  objects: ObjectItem[];
  type: string;
}
interface SubscriptionPlansState {
  plans: SubscriptionPlan[];
  selectedPlan: SubscriptionPlan | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchSubscriptionPlans = createAsyncThunk<SubscriptionPlan[], number>(
  'subscriptionPlans/fetchPlans',
  async (versionApiId: number) => {
    const response = await axios.get(`${BACKEND_BASE_URL}/payment/payment-per-use/subscription-plans/${versionApiId}/`);
    console.log("subscription_plans", response.data)
    return response.data;
  }
);

const subscriptionPlansPerUseSlice = createSlice({
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

export const { selectPlan } = subscriptionPlansPerUseSlice.actions;

export default subscriptionPlansPerUseSlice.reducer;

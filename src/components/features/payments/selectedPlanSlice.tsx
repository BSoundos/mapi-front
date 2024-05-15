// selectedPlanSlice.ts

import { BACKEND_BASE_URL } from '@/data/constants';
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

  interface PromotionItem {
    id: number;
    is_active: boolean,
    subscription_plan: number,
    name: string,
    discount_amount : number ,
    start_date : string , 
    end_date : string , 
  }
interface PlanDetails {
  id: string;
  name: string;
  subscription_price: string;
  objects: ObjectItem[]; 
  promotion : PromotionItem;
  rate_limit :  number;
  api_version : number ;
  typeplan : string;
  type : string;

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

export const fetchPlanDetails = createAsyncThunk<PlanDetails, { planId: number }>(
  'plans/fetchSubscriptionPlanDetails',
  async ({ planId }) => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/payment/subscription-plan/${planId}/`);
      
      return { ...response.data, typeplan: 'subscriptionplan' };
    } catch (error) {
      throw new Error('Failed to fetch subscription plan details');
    }
  }
);

export const fetchUserPlanDetails = createAsyncThunk<PlanDetails, { planId: number }>(
  'plans/fetchUserPlanDetails',
  async ({ planId }) => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/payment/user-plan/${planId}/`);
      return { ...response.data, typeplan: 'userplan' };
    } catch (error) {
      throw new Error('Failed to fetch user plan details');
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
      })
      .addCase(fetchUserPlanDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPlanDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchUserPlanDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch plan details';
      });
  },
});

export default planSlice.reducer;

// selectedPlanSlice.ts

import { BACKEND_BASE_URL } from '@/data/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ObjectItem {
    id: number;
    price : string; 
    object_name: string;
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
    rate_limit: number;
    objects: ObjectItem[]; 
    type : string ;
    api_version : number ;
    typeplan : string;
    promotion : PromotionItem;


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
//recuperer les détails d'un plan selectionné
export const fetchPlanDetailsPerUse = createAsyncThunk<PlanDetails, { planId: string , objectPrices: { id: string, name: string, price: number }[]}>(
  'plans/fetchPlanDetails',
  async ({planId, objectPrices }) => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/payment/subscription-plan-per-use/${planId}/`);
      console.log("response.data", response.data);
            const responseDataWithObjectPrices = {
        ...response.data,
        objectPrices: objectPrices , typeplan: 'subscriptionplan' 
      };
      
      return responseDataWithObjectPrices;
    } catch (error) {
      throw new Error('Failed to fetch plan details');
    }
  }
);



export const fetchUserPlanDetailsPerUse = createAsyncThunk<PlanDetails, { planId: number }>(
  'plans/fetchUserPlanDetails',
  async ({ planId }) => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/payment/user-plan-per-use/${planId}/`);
      console.log("response.data userplan", response.data);
      return { ...response.data, typeplan: 'userplan' };
    } catch (error) {
      throw new Error('Failed to fetch user plan details');
    }
  }
);



const planPerUseSlice = createSlice({
  name: 'plan_peruse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanDetailsPerUse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlanDetailsPerUse.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchPlanDetailsPerUse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch plan details';
      })
      .addCase(fetchUserPlanDetailsPerUse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPlanDetailsPerUse.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchUserPlanDetailsPerUse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch plan details';
      });
  },
});

export default planPerUseSlice.reducer;

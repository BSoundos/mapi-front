// selectedPlanSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ObjectItem {
    id: number;
    price : string; 
    name: string;
  }

interface PlanDetails {
    id: string;
    name: string;
    rate_limit: number;
    objectPrices: ObjectItem[]; 
    type : string ;
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
//recuperer les détails d'un plan selectionné
export const fetchPlanDetails = createAsyncThunk<PlanDetails, { planId: string , objectPrices: { id: string, name: string, price: number }[]}>(
  'plans/fetchPlanDetails',
  async ({planId, objectPrices }) => {
    try {
      const response = await axios.get(`http://localhost:8000/payment/subscription-plan/${planId}/`);
      console.log("response.data", response.data);
            const responseDataWithObjectPrices = {
        ...response.data,
        objectPrices: objectPrices
      };
      
      return responseDataWithObjectPrices;
    } catch (error) {
      throw new Error('Failed to fetch plan details');
    }
  }
);


const planPerUseSlice = createSlice({
  name: 'plan_peruse',
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

export default planPerUseSlice.reducer;

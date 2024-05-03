import { BACKEND_BASE_URL } from '@/data/constants';
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

interface PromotionItem {
  id: number;
  is_active: boolean,
  subscription_plan: number,
  name: string,
  discount_amount : number ,
  start_date : string , 
  end_date : string , 
}

interface FeatureItem{
  id: number;
  is_active: boolean,
  user_plan: number,
  subscription_plan: number,
  feature_name: string
}

interface UserPlan {
  id: number ; 
  type: string ; 
  rate_limit: number ; 
  name:string ; 
  description : string ; 
  subscription_price: number ; 
  api_version : number ; 
  objects: ObjectItem[]; 
  features : FeatureItem[];
}

interface SubscriptionPlan {
  id: number;
  name: string;
  subscription_price: string;
  rate_limit: number;
  objects: ObjectItem[]; 
  features : FeatureItem[];
  promotion : PromotionItem;
  is_recommended : boolean;
  type : string ;
}

interface SubscriptionPlansState {
  plans: SubscriptionPlan[];
  userplans: UserPlan[];
  selectedPlan: SubscriptionPlan | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchSubscriptionPlans = createAsyncThunk<SubscriptionPlan[], number>(
  'subscriptionPlans/fetchPlans',
  async (versionApiId: number) => {
    const response = await axios.get(`${BACKEND_BASE_URL}/payment/payment-per-month/subscription-plans/${versionApiId}/`);
    console.log("subscription_plans",response.data)
    return response.data; 
  }
);

export const fetchUserPlans = createAsyncThunk<UserPlan[], number>(
  'subscriptionPlans/fetchUserPlans',
  async (versionApiId: number) => {
    const userId = 3
    const response = await axios.get(`${BACKEND_BASE_URL}/payment/payment-per-month/user-plans/${versionApiId}/${userId}/`);
    console.log("user_plans", response.data);
    return response.data; 
  }
);


const subscriptionPlansSlice = createSlice({
  name: 'subscriptionPlans',
  initialState: {
    plans: [],
    userplans: [],
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
      })
      .addCase(fetchUserPlans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserPlans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userplans = action.payload;
      })
      .addCase(fetchUserPlans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { selectPlan } = subscriptionPlansSlice.actions;

export default subscriptionPlansSlice.reducer;

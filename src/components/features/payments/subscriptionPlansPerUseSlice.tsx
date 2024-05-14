import { BACKEND_BASE_URL } from '@/data/constants';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ObjectItem {
  id: string;
  price : number ; 
  object_name: string;
}

interface ObjectItem2 {
  id: string;
  price : number ; 
  object_name: string;
}

interface FeatureItem {
  id: number;
  is_active: boolean,
  user_plan: number,
  subscription_plan: number,
  feature_name: string
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

interface SubscriptionPlan {
  id: string;
  name: string;
  rate_limit: number;
  objects: ObjectItem[]; 
  type : string ;
  is_recommended : boolean;
  features : FeatureItem[];
  promotion : PromotionItem;


}

interface UserPlan {
  id: number ; 
  type: string ; 
  rate_limit: number ; 
  name:string ; 
  subscription_price: number ; 
  objects: ObjectItem2[]; 
  features : FeatureItem[];

}


interface SubscriptionPlansState {
  plans: SubscriptionPlan[];
  userplans: UserPlan[];
  selectedPlan: SubscriptionPlan | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
const getToken = () => {

  return localStorage.getItem('token'); // Retrieve token from localStorage
};
export const fetchSubscriptionPlansPerUse = createAsyncThunk<SubscriptionPlan[], number>(
  'subscriptionPlans/fetchPlans-peruse',
  async (versionApiId: number) => {
    const response = await axios.get(`${BACKEND_BASE_URL}/payment/payment-per-use/subscription-plans/${versionApiId}/`);
    return response.data; 
  }
);

export const fetchUserPlansPerUse = createAsyncThunk<UserPlan[], number>(
  'userPlans/fetchPlans-peruse',
  async (versionApiId: number) => {
    const token = getToken();
    const response = await axios.get(`${BACKEND_BASE_URL}/payment/payment-per-use/user-plans/${versionApiId}/`,{
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data; 
  }
);

const subscriptionPlansPerUseSlice = createSlice({
  name: 'subscriptionPlansPerUse',
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
      .addCase(fetchSubscriptionPlansPerUse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubscriptionPlansPerUse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plans = action.payload;
      })
      .addCase(fetchSubscriptionPlansPerUse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(fetchUserPlansPerUse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserPlansPerUse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userplans = action.payload;
      })
      .addCase(fetchUserPlansPerUse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { selectPlan } = subscriptionPlansPerUseSlice.actions;

export default subscriptionPlansPerUseSlice.reducer;
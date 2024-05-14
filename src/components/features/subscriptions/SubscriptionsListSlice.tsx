import { BACKEND_BASE_URL } from '@/data/constants';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


interface AccessKeyItem {
  access_key_id: number;
  access_key: string;
  status: number
}


interface SubscriptionPlanItem {
    id: number,
    type: string,
    rate_limit: number,
    name: string,
    is_active: boolean,
    is_recommended: boolean,
    subscription_price: string ,
    recommended: boolean,
    api_version: number
}


interface Subscription {
  subscription_id: number;
  subscription_date: string;
  api_version: number;
  user: number;
  user_plan : SubscriptionPlanItem;
  access_key : AccessKeyItem ; 
  subscription_plan : SubscriptionPlanItem;
  api_name :string;
}

interface InvoiceState {
    subscriptions : Subscription[];
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
  }
  
  // Define initial state object with default values
  const initialState: InvoiceState = {
    subscriptions: [],
    loading: false,
    error: null,
    status: 'loading' 
  };

const getToken = () => {

    return localStorage.getItem('token'); // Retrieve token from localStorage
};
export const fetchSubscriptions = createAsyncThunk<Subscription[]>(
    '/SubscriptionsList',
    async () => {
      const token = getToken();
      const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/user-subscriptions/`,{
        headers: {
          Authorization: `Token ${token}`
        }
      });

      return response.data; 
    }
  );
const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    // Reducer to handle loading state
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // Reducer to handle error state
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    // Reducer to handle adding subsscriptions
    addInvoices(state, action: PayloadAction<Subscription[]>) {
      state.subscriptions= action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});



export const { setLoading, setError, addInvoices } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
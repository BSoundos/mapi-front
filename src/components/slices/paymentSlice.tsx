import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface PaymentDetails {
  amount: string;
  currency: string;
  payment_method: string;
  id_plan : number;
  api_version : number ;
}

interface PaymentResponse {
    checkout_url?: object;
    error?: string;
  }
interface PaymentState {
    loading: boolean;
    error: string | null;
    checkoutUrl: string | null;
  }
  
  const initialState: PaymentState = {
    loading: false,
    error: null,
    checkoutUrl: null,
  };

  //payment process
export const confirmPayment = createAsyncThunk(
  'payment/confirmPayment',
  async (paymentDetails: PaymentDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/payment/process-payment/', paymentDetails);
      return response.data as PaymentResponse;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(confirmPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.checkout_url) {
        } else if (action.payload && action.payload.error) {
          state.error = action.payload.error;
        }
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.loading = false;
    });
  },
});

export default paymentSlice.reducer;

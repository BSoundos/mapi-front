import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface InvoiceDetail {
  trans_number: number;
  amount: number;
  payment_date: String;
  clientName: String;
  apiName: string;
  description: string;
}



interface InvoiceDetailState {
    invoiceD: InvoiceDetail;
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
  }
  
  // Define initial state object with default values
  const initialState: InvoiceDetailState = {
    invoiceD: {
      trans_number: 0, 
      amount: 0,
      payment_date: "",
      clientName: "",
      apiName: "",
      description: ""
    },
    loading: false,
    error: null,
    status: 'loading' 
  };

export const fetchInvoiceDetail = createAsyncThunk<InvoiceDetail, number>(
    'InvoiceDetail',
    async (payment_id: number) => {
      console.log(payment_id);
      const response = await axios.get(`http://127.0.0.1:8000/payment/payment-detail/${payment_id}`);
      console.log(response.data);
      return response.data; 
    }
  );
  
 


const invoiceDSlice = createSlice({
  name: 'InvoiceDetail',
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
    // Reducer to handle adding invoices
    addInvoices(state, action: PayloadAction<InvoiceDetail>) {
      state.invoiceD = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoiceDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvoiceDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invoiceD = action.payload;
      })
      .addCase(fetchInvoiceDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});



export const { setLoading, setError, addInvoices } = invoiceDSlice.actions;
export default invoiceDSlice.reducer;
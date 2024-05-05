import { BACKEND_BASE_URL } from '@/data/constants';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';


interface Invoice {
  id: number;
  apiName: string;
  totalAmount: number;
  planName: String;
  createdAt: string;
}

interface InvoiceState {
<<<<<<< HEAD
    invoices: Invoice[];
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
=======
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
}

// Define initial state object with default values
const initialState: InvoiceState = {
  invoices: [],
  loading: false,
  error: null,
};

export const fetchInvoices = createAsyncThunk<Invoice[]>(
  'InvoiceHistory',
  async () => {
    const response = await axios.get(`${BACKEND_BASE_URL}/invoices/`);
    console.log(response.data.invoices);
    return response.data.invoices;
>>>>>>> 4590a452e85fc1e3f03d0e389c0df7b6eb844c7e
  }
  
  // Define initial state object with default values
  const initialState: InvoiceState = {
    invoices: [],
    loading: false,
    error: null,
    status: 'loading' 
  };

export const fetchInvoices = createAsyncThunk<Invoice[], number>(
    'InvoiceHistory',
    async (user_id: number) => {
      console.log(user_id);
      const response = await axios.get(`${BACKEND_BASE_URL}/payment/payment-history/${user_id}`);
      console.log(response.data);
      return response.data; 
    }
  );
  
 


const invoiceSlice = createSlice({
  name: 'invoice',
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
    addInvoices(state, action: PayloadAction<Invoice[]>) {
      state.invoices = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});



export const { setLoading, setError, addInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;
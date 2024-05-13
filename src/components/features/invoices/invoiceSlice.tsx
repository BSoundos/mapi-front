import { BACKEND_BASE_URL } from '@/data/constants';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


interface Invoice {
  id: number;
  apiName: string;
  totalAmount: number;
  planName: String;
  createdAt: string;
}

interface InvoiceState {
    invoices: Invoice[];
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
 
}

  // Define initial state object with default values
  const initialState: InvoiceState = {
    invoices: [],
    loading: false,
    error: null,
    status: 'loading' 
  };
  const getToken = () => {
    return localStorage.getItem('token'); // Retrieve token from localStorage
  };
export const fetchInvoices = createAsyncThunk<Invoice[], string>(
    'InvoiceHistory',
    async (username: string) => {
      const token = getToken();
      const response = await axios.get(`${BACKEND_BASE_URL}/payment/payment-history/${username}`,{
        headers: {
          Authorization: `Token ${token}`
        }
      });
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
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';


interface Invoice {
  id: number;
  apiName: string;
  status: 'paid' | 'unpaid';
  totalAmount: number;
  planName: string;
  createdAt: string;
}

interface InvoiceState {
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
});



export const { setLoading, setError, addInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;
import { BACKEND_BASE_URL } from '@/data/constants';
import { User } from '@/types/user';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';




interface ProviderState {
    providers: User[];
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
 
}

  // Define initial state object with default values
  const initialState: ProviderState = {
    providers: [],
    loading: false,
    error: null,
    status: 'loading' 
  };
  const getToken = () => {
    return localStorage.getItem('token'); // Retrieve token from localStorage
  };
export const fetchProviders = createAsyncThunk<User[]>(
    'providersList',
    async () => {
      const token = getToken();
      const response = await axios.get(`${BACKEND_BASE_URL}/accounts-management/provider/`,{
        headers: {
          Authorization: `Token ${token}`
        }
      });
      console.log(response.data);
      return response.data; 
    }
  );
  
 
const providersSlice = createSlice({
  name: 'providers',
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
    addProviders(state, action: PayloadAction<User[]>) {
      state.providers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.providers = action.payload;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});



export const { setLoading, setError, addProviders } = providersSlice.actions;
export default providersSlice.reducer;
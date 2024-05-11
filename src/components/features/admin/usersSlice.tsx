import { BACKEND_BASE_URL } from '@/data/constants';
import { User } from '@/types/user';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';




interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
 
}

  // Define initial state object with default values
  const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    status: 'loading' 
  };
  const getToken = () => {
    return localStorage.getItem('token'); // Retrieve token from localStorage
  };
export const fetchUsers = createAsyncThunk<User[]>(
    'usersList',
    async () => {
      const token = getToken();
      const response = await axios.get(`${BACKEND_BASE_URL}/accounts-management/user/`,{
        headers: {
          Authorization: `Token ${token}`
        }
      });
      console.log(response.data);
      return response.data; 
    }
  );
  
 
const usersSlice = createSlice({
  name: 'users',
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
    addUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});



export const { setLoading, setError, addUsers } = usersSlice.actions;
export default usersSlice.reducer;
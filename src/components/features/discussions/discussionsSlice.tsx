
import { User } from '@/types/user';
import { Discussion } from '@/types/DiscussionType';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';



export interface Category{
  category_id: number;
  name: string;
  description: string;
}

export interface Api {
    api_id: number;
    name: string;
    description: string;
    votes: number;
    popularity: number;
    latency: number;
    service_level: number;
    health_check: number;
    category: Category;
    provider: User;
}





interface DiscussionsState {
  discussions: Discussion[];
  loading: boolean,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const getToken = () => {
  return localStorage.getItem('token'); // Retrieve token from localStorage
};

export const fetchDiscussions = createAsyncThunk<Discussion[], number>(
  'Discussions',
  async (apiId: number) => {
    const token = getToken();
    const response = await axios.get(`http://127.0.0.1:8000/support_hub/api/${apiId}/discussion/`,{
      headers: {
        Authorization: `Token ${token}`
      }
    });
    console.log(response.data)
    return response.data; 
  }
);

const DiscussionsSlice = createSlice({
  name: 'discussions',
  initialState: {
    discussions: [],
    loading: false,
    status: 'idle',
    error: null,
  } as DiscussionsState, 
  reducers: {
    // Reducer to handle loading state
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // Reducer to handle error state
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    // Reducer to handle adding discussions
    addDiscussions(state, action: PayloadAction<Discussion[]>) {
      state.discussions = action.payload.map((discussion) => ({
        ...discussion,
        // Ensure user details are properly populated
        user: {
          id: discussion.user.id,
          first_name: discussion.user.first_name,
          last_name: discussion.user.last_name,
          email: discussion.user.email,
          contact_info: discussion.user.contact_info,
          status: discussion.user.status,
          is_verified: discussion.user.is_verified,
          role: discussion.user.role,
          username: discussion.user.username,
        },
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscussions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDiscussions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.discussions = action.payload;
      })
      .addCase(fetchDiscussions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { setLoading, setError, addDiscussions }  = DiscussionsSlice.actions;

export default DiscussionsSlice.reducer;

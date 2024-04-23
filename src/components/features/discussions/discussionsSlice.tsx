import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_info: string;
  status: boolean;
  verification_code: string;
  is_verified: boolean;
  role: string;
}


interface Category{
  category_id:number;
  name: string;
  description: string;

}


interface Api {
  api_id: number;
  name: string;
  description: string;
  popularity: Float32Array;
  votes: number;
  latency: number;
  service_level: number;
  health_check: string;
  category: Category;
  provider: User;
}

interface Discussion {
  discussion_id: string;
  content: string;
  title: string;
  discussion_date: string;
  user: User;
  api: Api;
}

interface DiscussionState {
  discussions: Discussion[];
  loading: boolean,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchDiscussions = createAsyncThunk<Discussion[], number>(
  'Discussions',
  async (apiId: number) => {
    const response = await axios.get(`http://127.0.0.1:8000/support_hub/api/${apiId}/discussion/`);
    console.log("Discussions: ",response.data)
    return response.data; 
  }
);

const DiscussionSlice = createSlice({
  name: 'discussions',
  initialState: {
    discussions: [],
    loading: false,
    status: 'idle',
    error: null,
  } as DiscussionState, 
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
          verification_code: discussion.user.verification_code,
          is_verified: discussion.user.is_verified,
          role: discussion.user.role,
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

export const { setLoading, setError, addDiscussions }  = DiscussionSlice.actions;

export default DiscussionSlice.reducer;

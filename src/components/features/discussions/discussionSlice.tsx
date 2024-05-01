
import { User } from '@/types/user';
import { Discussion } from '@/types/DiscussionType';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';






interface DiscussionState {
  discussion: Discussion;
  loading: boolean,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const getToken = () => {
  return localStorage.getItem('token'); // Retrieve token from localStorage
};

export const fetchDiscussion = createAsyncThunk<Discussion, number>(
  'Discussion',
  async (discussionId: number) => {
    const token = getToken();
    const response = await axios.get(`http://127.0.0.1:8000/support_hub/get-discussion/${discussionId}/`,{
      headers: {
        Authorization: `Token ${token}`
      }
    });
    console.log(response.data);
    return response.data; 
  }
);

const DiscussionSlice = createSlice({
  name: 'discussion',
  initialState: {
    discussion: {},
    loading: false,
    status: 'idle',
    error: null,
  } as DiscussionState, 
  reducers: {
    // Reducers for setting loading and error states can remain as they are
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscussion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDiscussion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.discussion = action.payload;
      })
      .addCase(fetchDiscussion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { setLoading, setError }  = DiscussionSlice.actions;

export default DiscussionSlice.reducer;

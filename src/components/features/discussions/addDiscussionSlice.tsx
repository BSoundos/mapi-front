import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';


interface AddDiscussionState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AddDiscussionState = {
  status: 'idle',
  error: null,
};

export const postDiscussion = createAsyncThunk(
  'addDiscussion/postDiscussion',
  async ({ apiId, title, content }: { apiId: number; title: string; content: string }) => {
    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/support_hub/add-discussion/${apiId}/`, { title, content });
      console.log(response.data)
      return response.data;

    } catch (error) {
      
    }
  }
);

const addDiscussionSlice = createSlice({
  name: 'addDiscussion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postDiscussion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postDiscussion.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(postDiscussion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to post discussion';
      });
  },
});

export const selectAddDiscussionStatus = (state: RootState) => state.addDiscussion.status;
export const selectAddDiscussionError = (state: RootState) => state.addDiscussion.error;

export default addDiscussionSlice.reducer;

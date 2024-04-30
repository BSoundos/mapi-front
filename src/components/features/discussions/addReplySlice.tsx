import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import axios from 'axios';

interface AddRepltState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AddRepltState = {
  status: 'idle',
  error: null,
};

export const postReply = createAsyncThunk(
  'addReply/postReply',
  async ({ discussionId, content }: { discussionId: number;  content: string }) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/support_hub/add-reply/${discussionId}/`, { content });
      console.log(response.data)
      return response.data;

    } catch (error) {
      
    }
  }
);

const addReplySlice = createSlice({
  name: 'addReply',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postReply.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postReply.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(postReply.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to post Reply';
      });
  },
});

export const selectAddReplyStatus = (state: RootState) => state.addReply.status;
export const selectAddReplyError = (state: RootState) => state.addReply.error;

export default addReplySlice.reducer;

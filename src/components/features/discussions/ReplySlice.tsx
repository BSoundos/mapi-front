
import { User } from '@/types/User';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Discussion } from './discussionsSlice';






export interface Reply {
    reply_id: number;
    content: string;
    reply_date: string; 
    discussion: Discussion;
    author: User;
  }

interface ReplyState {
  replies: Reply[];
  loading: boolean,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const getToken = () => {
  return localStorage.getItem('token'); // Retrieve token from localStorage
};

export const fetchReplies = createAsyncThunk<Reply[], number>(
  'Replies',
  async (discussionId: number) => {
    const token = getToken();
    const response = await axios.get(`http://127.0.0.1:8000/support_hub/get-reply/${discussionId}/`,{
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data; 
  }
);

const ReplySlice = createSlice({
  name: 'replies',
  initialState: {
    replies: [],
    loading: false,
    status: 'idle',
    error: null,
  } as ReplyState, 
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
    addReplies(state, action: PayloadAction<Reply[]>) {
        state.replies = action.payload.map((reply) => ({
          reply_id: reply.reply_id, // Add reply_id property
          reply_date: reply.reply_date, // Add reply_date property
          content: reply.content,
          discussion: {
            discussion_id: reply.discussion.discussion_id,
            content: reply.discussion.content,
            title: reply.discussion.title,
            discussion_date: reply.discussion.discussion_date,
            user: reply.discussion.user,
            api: reply.discussion.api,
          },
          author: {
            id: reply.author.id,
            first_name: reply.author.first_name,
            last_name: reply.author.last_name,
            email: reply.author.email,
            contact_info: reply.author.contact_info,
            status: reply.author.status,
            verification_code: reply.author.verification_code,
            is_verified: reply.author.is_verified,
            role: reply.author.role,
          },
        }));
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReplies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReplies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.replies = action.payload;
      })
      .addCase(fetchReplies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { setLoading, setError, addReplies }  = ReplySlice.actions;

export default ReplySlice.reducer;

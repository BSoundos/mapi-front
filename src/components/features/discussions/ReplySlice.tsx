
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Reply } from '@/types/Reply';









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
    const response = await axios.get(`http://127.0.0.1:8000/support_hub/discussion/${discussionId}/replies/`,{
      headers: {
        Authorization: `Token ${token}`
      }
    });
    console.log(response.data)
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
          author_object_id: reply.author_object_id,
          author_content_type: reply.author_content_type,
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
            is_verified: reply.author.is_verified,
            role: reply.author.role,
            username: reply.author.username,
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

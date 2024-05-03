import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TicketReply } from '@/types/TicketReply';

interface TicketDiscussionState {
    replies: TicketReply[] ;
    reply : TicketReply;
    loading: boolean;
    error: string | null;
}
  
// Define initial state object with default values
const initialState: TicketDiscussionState = {
    replies: [],
    reply : null,
    loading: false,
    error: null,
};

const getToken = () => {
  return localStorage.getItem('token'); // Retrieve token from localStorage
};

// Create an async thunk to fetch ticket replies from the backend
export const FetchTicketReplies = createAsyncThunk<TicketReply[], number>(
  'TicketReplies',
  async (ticketId) => {
    const token = getToken();
    const response = await axios.get(`http://127.0.0.1:8000/support_hub/ticket/${ticketId}/replies/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  }
);

// Add a new ticket reply
export const AddTicketReply = createAsyncThunk<TicketReply, { ticketId: number; content: string }>(
  'TicketReplies/AddTicketReply',
  async ({ ticketId, content }) => {
    const token = getToken();
    const response = await axios.post(
      `http://127.0.0.1:8000/support_hub/add_ticket_reply/${ticketId}/`,
      { content },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data; // Return the new reply
  }
);


// Redux slice for ticket discussions
const TicketDiscussionSlice = createSlice({
  name: 'TicketDiscussion',
  initialState: {
    replies: [],
    reply: null,
    loading: false,
    error: null,
  },
  reducers: {
    addReply(state, action) {
      state.replies.push(action.payload);
    }, 
  },
  extraReducers: (builder) => {
    builder.addCase(FetchTicketReplies.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(FetchTicketReplies.fulfilled, (state, action) => {
      state.loading = false;
      state.replies = action.payload; // Update the replies with fetched data
    });

    builder.addCase(FetchTicketReplies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch ticket replies';
    });

    builder.addCase(AddTicketReply.fulfilled, (state, action) => {
      state.replies.push(action.payload); // Append the newly added reply to the existing list
    });

    builder.addCase(AddTicketReply.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(AddTicketReply.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to add a new ticket reply';
    });

    
  },
});

export const { addReply } = TicketDiscussionSlice.actions;

export default TicketDiscussionSlice.reducer;
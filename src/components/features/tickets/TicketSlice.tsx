import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Ticket } from '@/types/Ticket';
import { StatusHistoryItem } from '@/types/StatusHistory';

interface TicketState {
    ticket: Ticket; 
    tickets: Ticket[] ;
    loading: boolean;
    error: string | null;
}
  
// Define initial state object with default values
const initialState: TicketState = {
    ticket: null,
    tickets: [],
    loading: false,
    error: null,
};

const getToken = () => {
  return localStorage.getItem('token'); // Retrieve token from localStorage
};

export const FetchProviderTickets = createAsyncThunk<Ticket[]>(
    'TicketsProvider',
    async () => {
      const token = getToken();
      const response = await axios.get('http://localhost:8000/support_hub/get_all_providertickets/' ,{
        headers: {
          Authorization: `Token ${token}`
        }
      });
      return response.data;
    }
  );

  export const FetchUserTickets = createAsyncThunk<Ticket[]>(
    'TicketsUser',
    async () => {
      const token = getToken();
      const response = await axios.get('http://127.0.0.1:8000/support_hub/get_all_usertickets/' ,{
        headers: {
          Authorization: `Token ${token}`
        }
      });
      return response.data;
    }
  );

  export const searchTickets = createAsyncThunk<Ticket[], string>(
    'Tickets/searchTickets',
    async (searchQuery: string): Promise<Ticket[]> => {
      const response = await axios.get(`http://127.0.0.1:8000/support_hub/tickets/search/?q=${searchQuery}`);
      const data = response.data;
  
      const mappedData: Ticket[] = data.map((ticket: any) => ({
        id: ticket.id,
        title: ticket.title,
        content: ticket.content,
        user: {
          id: ticket.user.id,
          username: ticket.user.username,
          first_name: ticket.user.first_name,
          last_name: ticket.user.last_name
        },
        priority: ticket.priority,
        api: ticket.api,
        status_history: ticket.status_history.map((status: StatusHistoryItem) => ({
          id: status.id,
          status: status.status,
          update_message: status.update_message,
          update_date: status.update_date,
          ticket: status.ticket,
        })),
      }));
  
      return mappedData;
    }
  );

  export const fetchTicketsByPriority = createAsyncThunk<Ticket[], number>(
    'Tickets/fetchTicketsByPriority',
    async (priority: number): Promise<Ticket[]> => {
      const response = await axios.get(
        `http://127.0.0.1:8000/support_hub/tickets/filter-by-priority/?priority=${priority}`
      );
      const data = response.data;
  
      const mappedData: Ticket[] = data.map((ticket: any) => ({
        id: ticket.id,
        title: ticket.title,
        content: ticket.content,
        user: {
          id: ticket.user.id,
          username: ticket.user.username,
          first_name: ticket.user.first_name,
          last_name: ticket.user.last_name,
        },
        priority: ticket.priority,
        api: ticket.api,
        status_history: ticket.status_history.map((status: StatusHistoryItem) => ({
          id: status.id,
          status: status.status,
          update_message: status.update_message,
          update_date: status.update_date,
          ticket: status.ticket,
        })),
      }));
  
      return mappedData;
    }
  );
 

  export const fetchTicketsByStatus = createAsyncThunk<Ticket[], string>(
    'Tickets/fetchTicketsByStatus',
    async (status: string): Promise<Ticket[]> => {
      const response = await axios.get(
        `http://127.0.0.1:8000/support_hub/tickets/filter-by-status/?status=${status}`
      );
      const data = response.data;
  
      const mappedData: Ticket[] = data.map((ticket: any) => ({
        id: ticket.id,
        title: ticket.title,
        content: ticket.content,
        user: {
          id: ticket.user.id,
          username: ticket.user.username,
          first_name: ticket.user.first_name,
          last_name: ticket.user.last_name,
        },
        priority: ticket.priority,
        api: ticket.api,
        status_history: ticket.status_history.map((statusItem: StatusHistoryItem) => ({
          id: statusItem.id,
          status: statusItem.status,
          update_message: statusItem.update_message,
          update_date: statusItem.update_date,
          ticket: statusItem.ticket,
        })),
      }));
  
      return mappedData;
    }
  );

  
  export const fetchTicketsByNewest = createAsyncThunk<Ticket[], void>(
    'Tickets/fetchTicketsByNewest',
    async (): Promise<Ticket[]> => {
      const response = await axios.get(
        `http://127.0.0.1:8000/support_hub/tickets/filter-by-date/`
      );
      const data = response.data;
  
      const mappedData: Ticket[] = data.map((ticket: any) => ({
        id: ticket.id,
        title: ticket.title,
        content: ticket.content,
        user: {
          id: ticket.user.id,
          username: ticket.user.username,
          first_name: ticket.user.first_name,
          last_name: ticket.user.last_name,
        },
        priority: ticket.priority,
        api: ticket.api,
        status_history: ticket.status_history.map((statusItem: StatusHistoryItem) => ({
          id: statusItem.id,
          status: statusItem.status,
          update_message: statusItem.update_message,
          update_date: statusItem.update_date,
          ticket: statusItem.ticket,
        })),
      }));
  
      return mappedData;
    }
  );

  export const updateTicketStatus = createAsyncThunk(
    'ticket/updateTicketStatus',
    async ({ ticketId, newStatus, updateMessage }: { ticketId: number; newStatus: string; updateMessage?: string }, { rejectWithValue }) => {
      try{
        const token = getToken();
  
      // Create the request body
      const requestBody: { status: string; update_message?: string } = {
        status: newStatus,
      };
  
      // Conditionally add the update message if it is provided
      if (updateMessage && updateMessage.trim() !== '') {
        requestBody.update_message = updateMessage;
      }
  
      const response = await axios.post(
        `http://127.0.0.1:8000/support_hub/update_ticket_state/${ticketId}/`,
        requestBody,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
  
      return response.data; // Return the updated ticket

      }
      catch (error) {
        if (axios.isAxiosError(error)) {
          // Extract the error message from the server's response
          const serverErrorMessage = error.response?.data?.error || 'Failed to update ticket status';
          return rejectWithValue(serverErrorMessage); // Reject with a meaningful error message
        }
  
        // If it's not an Axios error, use a general message
        return rejectWithValue('An unexpected error occurred');
      }
      
    }
  );

  export const updateTicketPriority = createAsyncThunk(
    'ticket/updateTicketPriority',
    async ({ ticketId, newPriority }: { ticketId: number; newPriority: number }) => {
      const token = getToken();
      const response = await axios.put(
        `http://127.0.0.1:8000/support_hub/update_ticket_priority/${ticketId}/`,
        { priority: newPriority },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return response.data;
    }
  );

  // Add a new ticket
  export const addTicket = createAsyncThunk(
    'tickets/addTicket',
    async ({ apiPk, title, content }:{ apiPk: number; title: string; content:string }) => {
      const token = getToken();
      const response = await axios.post(
        `http://127.0.0.1:8000/support_hub/add_ticket/${apiPk}/`,
        { title:title , content:content },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("add ticket : ",response.data)
      return response.data; // Return the added ticket's data
    }
  );

  // Delete a ticket by its ID
  export const deleteTicket = createAsyncThunk(
    'tickets/deleteTicket',
    async (ticketId: number) => {
      const token = getToken();
      const response = await axios.delete(
        `http://127.0.0.1:8000/support_hub/ticket/delete/${ticketId}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return { ticketId }; // Return the ID of the deleted ticket
    }
  );

  // Async thunk to fetch a ticket by ID
export const getTicketById = createAsyncThunk(
  'tickets/getTicketById',
  async (ticketId: number) => {
    const token = getToken();  // Get the authentication token
    const response = await axios.get(
      `http://127.0.0.1:8000/support_hub/ticket/${ticketId}/`,
      {
        headers: {
          Authorization: `Token ${token}`,  // Set the authorization header
        },
      }
    );

    if (response.status === 200) {
      return response.data;  // Return the ticket data
    } else {
      throw new Error(`Failed to fetch ticket with ID ${ticketId}`);  // Handle errors
    }
  }
);

// Création d'un slice pour gérer l'état du ticket dans le store Redux
const TicketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(FetchProviderTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchProviderTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(FetchProviderTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to get tickets';
      })
      .addCase(FetchUserTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchUserTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(FetchUserTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to get tickets';
      })
      .addCase(addTicket.fulfilled, (state, action) => {
        state.tickets.push(action.payload); // Add the new ticket to the state
      })
      .addCase(deleteTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = state.tickets.filter((ticket) => ticket.id !== action.payload.ticketId);
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to delete ticket';
      })
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        // Find the updated ticket in the state and replace it with the updated data
        state.loading = false;
        const updatedTicket = action.payload;
        const index = state.tickets.findIndex(
          (ticket) => ticket.id === updatedTicket.id
        );
        if (index !== -1) {
          state.tickets[index] = updatedTicket; // Replace with the updated ticket
        }
      })
      .addCase(updateTicketStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTicketStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTicketPriority.pending, (state) => {
        state.loading = true; 
      })
      .addCase(updateTicketPriority.fulfilled, (state, action) => {
        state.loading = false; 
        const updatedTicket = action.payload;
        console.log("updated ticket in priority = ",updatedTicket);
        const index = state.tickets.findIndex(
          (ticket) => ticket.id === updatedTicket.id
        );
        if (index !== -1) {
          state.tickets[index] = updatedTicket; // Update the ticket with the new priority
        }
      })
      .addCase(updateTicketPriority.rejected, (state, action) => {
        state.loading = false; // Reset loading state
        state.error = action.error.message || 'Failed to update ticket priority';
      })
      .addCase(getTicketById.pending, (state) => {
        state.loading = true;   // Indicate loading
        state.error = null;     // Reset errors
      })
      .addCase(getTicketById.fulfilled, (state, action) => {
        state.loading = false;  // Loading is complete
        state.ticket = action.payload;  // Store the fetched ticket
      })
      .addCase(getTicketById.rejected, (state, action) => {
        state.loading = false;  // Loading is complete
        state.error = action.error.message;  // Store the error message
      });
    },
  });
  
  
  export default TicketSlice.reducer;
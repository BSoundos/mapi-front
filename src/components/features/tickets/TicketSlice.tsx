import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Ticket } from '../../../types/Ticket';
import { StatusHistoryItem } from '../../../types/StatusHistory';

interface TicketState {
    tickets: Ticket[] ;
    loading: boolean;
    error: string | null;
}
  
// Define initial state object with default values
const initialState: TicketState = {
    tickets: [],
    loading: false,
    error: null,
};

const getToken = () => {
  return localStorage.getItem('token'); // Retrieve token from localStorage
};

export const FetchProviderTickets = createAsyncThunk<Ticket[]>(
    'Tickets',
    async () => {
      const token = getToken();
      const response = await axios.get('http://localhost:8000/support_hub/get_all_providertickets/' ,{
        headers: {
          Authorization: `Token ${token}`
        }
      });
      console.log(response.data);
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
 
// Création d'un slice pour gérer l'état du ticket dans le store Redux
const TicketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(FetchProviderTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(FetchProviderTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      });
      builder.addCase(FetchProviderTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to get tickets';
      });
    },
  });
  
  
  export default TicketSlice.reducer;
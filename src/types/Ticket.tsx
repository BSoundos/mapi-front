import { User } from '../types/User';
import { StatusHistoryItem } from '../types/StatusHistory';


// Define interface for the Ticket object
  export interface Ticket {
    id: number;
    content: string;
    title: string;
    priority: number; 
    api: number;
    user: User; 
    status_history: StatusHistoryItem[]; // Array of status history items
  }
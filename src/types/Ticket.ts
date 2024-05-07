import { User } from '@/types/user';
import { StatusHistoryItem } from '@/types/StatusHistory';
import { Api } from '@/types/API';


// Define interface for the Ticket object
  export interface Ticket {
    id: number;
    content: string;
    title: string;
    priority: number; 
    api: Api;
    user: User; 
    status_history: StatusHistoryItem[]; // Array of status history items
  }
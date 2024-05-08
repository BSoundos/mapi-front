
export interface Choice {
    value: string | number;
    label: string;
  }
  
  export const STATUS_CHOICES: Choice[] = [
    { value: 'open', label: 'Open' },
    { value: 'solved', label: 'Solved' },
    { value: 'closed', label: 'Closed' },
    { value: 'in_progress', label: 'In Progress' },
  ];
  
  export const PRIORITY_CHOICES: Choice[] = [
    { value: 1, label: 'High' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'Low' },
  ];
  
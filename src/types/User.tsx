export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    contact_info: string;
    status: boolean;
    verification_code: string;
    is_verified: boolean;
    role: string;
  }
import { Category } from "./Category";
import { User } from "./user";


export interface API {
    popularAPIs: Api[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


export interface Api {
    api_id: number;
    name: string;
    description: string;
    votes: number;
    popularity: number;
    latency: number;
    service_level: number;
    category_name: string;
    health_check:string;
    category:Category;
    provider:User;
}

export type ValidAttributes = keyof Api;


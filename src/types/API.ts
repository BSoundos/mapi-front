

export interface API {
    popularAPIs: Api[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


export interface Api {
    id: number;
    name: string;
    description: string;
    votes: number;
    popularity: number;
    latency: number;
    service_level: number;
    category_name: string;
}

export type ValidAttributes = keyof Api;


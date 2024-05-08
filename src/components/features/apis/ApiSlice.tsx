import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '@/types/API';
import { Api } from '@/types/API';
import { BACKEND_BASE_URL } from '@/data/constants';


const getToken = () => {
  return localStorage.getItem('token'); // Retrieve token from localStorage
};


export const fetchPopularAPIs = createAsyncThunk<
  Api[],
  void,
  {}
>('api/fetchPopularAPIs', async (_, thunkAPI) => {
  const token = getToken();
  const headers = {
    Authorization: `Token ${token}`, 
  };

  const response = await axios.get(`${BACKEND_BASE_URL}/apis_exploitation/popular/`, { headers });
  
  const data = response.data;
  const mappedData = data.map((api: any) => ({
    api_id: api.api_id,
    name: api.name,
    description: api.description,
    votes: api.votes,
    popularity: api.popularity,
    latency: api.latency,
    service_level: api.service_level,
    category_name: api.category.name // Assigner le nom de la catégorie
  }));

  return mappedData;
});

export const fetchAPIById = createAsyncThunk('api/fetchAPIById', async (apiId, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.get(`${BACKEND_BASE_URL}/apis_exploitation/get-api-by-id/${apiId}/`, {
      headers,
    });
    const data = response.data;
    const mappedData: Api = {
      api_id: data.api_id,
      name: data.name,
      description: data.description,
      votes: data.votes,
      popularity: data.popularity,
      latency: data.latency,
      service_level: data.service_level,
      health_check: data.health_check,
      category: {
        category_id: data.category.category_id,
        name: data.category.name,
        description: data.category.description,
      },
      provider: {
        id: data.provider.id,
        first_name: data.provider.first_name,
        last_name: data.provider.last_name,
        email: data.provider.email,
      },
    };
    return mappedData;
  } catch (error) {
    // Handle error
    console.error('Error fetching API:', error);
    throw error;
  }
});

export const searchAPIs = createAsyncThunk<
  Api[],
  string,
  {}
>('api/searchAPIs', async (searchQuery: string, thunkAPI) => {
  const response = await axios.get(`${BACKEND_BASE_URL}/apis_exploitation/rechercheapi/?query=${searchQuery}`);
  const data = response.data;
  const mappedData = data.map((api: any) => ({
    api_id: api.api_id,
    name: api.name,
    description: api.description,
    votes: api.votes,
    popularity: api.popularity,
    latency: api.latency,
    service_level: api.service_level,
    category_name: api.category.name // Assigner le nom de la catégorie
  }));

  return mappedData;
}
);

export const FilterCategorie = createAsyncThunk<
  Api[],
  string,
  {}
>('api/FilterCategorie', async (categorie: string, thunkAPI) => {
  const response = await axios.get(`${BACKEND_BASE_URL}/apis_exploitation/category/?query=${categorie}`);
  const data = response.data;
  const mappedData = data.map((api: any) => ({
    api_id: api.api_id,
    name: api.name,
    description: api.description,
    votes: api.votes,
    popularity: api.popularity,
    latency: api.latency,
    service_level: api.service_level,
    category_name: api.category.name // Assigner le nom de la catégorie
  }));

  return mappedData;
}
);

// export const GetCategories = createAsyncThunk<
//   Api[],
//   void,
//   {}
// >('api/searchAPIs', async (_, thunkAPI) => {
//   const response = await axios.get(`${BACKEND_BASE_URL}/apis_exploitation/categories/`);
//   const data = response.data;
//   return data;
// }
// );

// export const GetFonctionnalities = createAsyncThunk<
//   Api[],
//   void,
//   {}
// >('api/searchAPIs', async (_, thunkAPI) => {
//   const response = await axios.get(`${BACKEND_BASE_URL}/apis_exploitation/fonctionnalities/`);
//   const data = response.data;
//   return data;
// }
// );

export const FilterFonctionnalite = createAsyncThunk<
  Api[],
  string,
  {}
>('api/FilterFonctionnalite', async (fonctionnaliter: string, thunkAPI) => {
  const response = await axios.get(`${BACKEND_BASE_URL}/apis_exploitation/functionalite/?query=${fonctionnaliter}`);
  const data = response.data;
  const mappedData = data.map((api: any) => ({
    api_id: api.api_id,
    name: api.name,
    description: api.description,
    votes: api.votes,
    popularity: api.popularity,
    latency: api.latency,
    service_level: api.service_level,
    category_name: api.category.name // Assigner le nom de la catégorie
  }));

  return mappedData;
}
);

const api = createSlice({
  name: 'api',
  initialState: {
    popularAPIs: [],
    api:null,
    status: 'idle',
    error: null,
  } as API,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPopularAPIs.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPopularAPIs.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.popularAPIs = action.payload;
    });
    builder.addCase(fetchPopularAPIs.rejected, (state) => {
      state.status = 'failed';
    })
   builder.addCase(fetchAPIById.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAPIById.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.api = action.payload;
    });
    builder.addCase(fetchAPIById.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export default api.reducer;
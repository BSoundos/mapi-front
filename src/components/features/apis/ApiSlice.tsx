import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../../types/API';
import { Api } from '../../../types/API';




export const fetchPopularAPIs = createAsyncThunk<
  Api[],
  void,
  {}
>('api/fetchPopularAPIs', async (_, thunkAPI) => {
  // const response = await fetch('http://localhost:8000/apis_exploitation/popular/');
  const response = await axios.get('http://localhost:8000/apis_exploitation/popular/')
  const data = response.data;
  const mappedData = data.map((api: any) => ({
    id: api.api_id,
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

export const searchAPIs = createAsyncThunk<
  Api[],
  string,
  {}
>('api/searchAPIs', async (searchQuery: string, thunkAPI) => {
  const response = await axios.get(`http://localhost:8000/apis_exploitation/rechercheapi/?query=${searchQuery}`);
  const data = response.data;
  const mappedData = data.map((api: any) => ({
    id: api.api_id,
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
>('api/searchAPIs', async (categorie: string, thunkAPI) => {
  const response = await axios.get(`http://localhost:8000/apis_exploitation/category/?query=${categorie}`);
  const data = response.data;
  const mappedData = data.map((api: any) => ({
    id: api.api_id,
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

export const GetCategories = createAsyncThunk<
  Api[],
  void,
  {}
>('api/searchAPIs', async (_, thunkAPI) => {
  const response = await axios.get(`http://localhost:8000/apis_exploitation/categories/`);
  const data = response.data;
  console.log(data)
  return data;
}
);

export const GetFonctionnalities = createAsyncThunk<
  Api[],
  void,
  {}
>('api/searchAPIs', async (_, thunkAPI) => {
  const response = await axios.get(`http://localhost:8000/apis_exploitation/fonctionnalities/`);
  const data = response.data;
  console.log(data)
  return data;
}
);

export const FilterFonctionnalite = createAsyncThunk<
  Api[],
  string,
  {}
>('api/searchAPIs', async (fonctionnaliter: string, thunkAPI) => {
  const response = await axios.get(`http://localhost:8000/apis_exploitation/functionalite/?query=${fonctionnaliter}`);
  const data = response.data;
  console.log(data)
  const mappedData = data.map((api: any) => ({
    id: api.api_id,
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
    });
  },
});

export default api.reducer;

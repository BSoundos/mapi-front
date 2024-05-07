import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/data/constants";


export const fetchAllApis = createAsyncThunk(
  "apiProvider/fetchAllApis",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user_id');
      const headers = {
        Authorization: `Token ${token}`,
      };

      const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-provider-apis/${user}`, { headers });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const createApi = createAsyncThunk(
  "apiProvider/createApi",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };

      const response = await axios.post(`${BACKEND_BASE_URL}/apis_management/add-api/`, data, { headers });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getApi = createAsyncThunk(
  "apiProvider/getApi",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };

      const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-api/${id}`, { headers });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateApi = createAsyncThunk(
  "apiProvider/updateApi",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };

      const response = await axios.put(`${BACKEND_BASE_URL}/apis_management/update-api/${id}/`, data, { headers });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const removeApi = createAsyncThunk(
  "apiProvider/removeApi",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };

      const response = await axios.delete(`${BACKEND_BASE_URL}/apis_management/delete-api/${id}`, { headers });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);
export const addNewFunctionality = createAsyncThunk(
  'apiProvider/addNewFunctionality',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.post(`${BACKEND_BASE_URL}/apis_management/api/${id}/add-functionality/`, data, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeFunctionalityFromApi = createAsyncThunk(
  "apiProvider/removeFunctionalityFromApi",
  async ({ apiPk, functionalityPk }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.delete(
        `${BACKEND_BASE_URL}/apis_management/delete-api-functionality/${apiPk}/${functionalityPk}/`,
        { headers }
      );

      if (response.status === 204) {
        return { apiPk, functionalityPk };
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

const apiSlice = createSlice({
  name: "apiProvider",
  initialState: {
    apis: [],
    api: {},
    loading: false,
    error: null,
  },
  reducers: {
    deleteApiFunctionality(state, action) {
      state.api.functionalities = state.api.functionalities.filter(functionality => functionality.functionality_id !== action.payload.functionalityPk);
    },
    addFunctionalityToApi(state, action) {
      const { functionalityId, functionalityName } = action.payload;
      state.api.functionalities.push({ functionality_id: functionalityId, name: functionalityName });
    },
    addApiToApis(state, action) {
      state.apis.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllApis.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllApis.fulfilled, (state, action) => {
        state.loading = false;
        state.apis = action.payload;
      })
      .addCase(fetchAllApis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(createApi.fulfilled, (state, action) => {
        state.loading = false;
        state.api=action.payload;
      })
      .addCase(createApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getApi.pending, (state) => {
        state.loading = true;
        state.api= {};
      })
      .addCase(getApi.fulfilled, (state, action) => {
        state.loading = false;
        state.api=action.payload;
      })
      .addCase(getApi.rejected, (state, action) => {
        state.loading = false;
        state.api= {};
        state.error = action.error.message;
      })
      .addCase(updateApi.pending, (state) => {
        state.loading = true;
        state.api= {};
      })
      .addCase(updateApi.fulfilled, (state, action) => {
        state.loading = false;
        state.api= action.payload;
      })
      .addCase(updateApi.rejected, (state, action) => {
        state.loading = false;
        state.api= {};
        state.error = action.error.message;
      })
      .addCase(addNewFunctionality.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewFunctionality.fulfilled, (state, action) => {
        state.loading = false;
        const { apiId, newFunctionality } = action.payload;
        const apiIndex = state.apis.findIndex((api) => api.id === apiId);
        if (apiIndex !== -1) {
          state.apis[apiIndex].functionalities.push(newFunctionality);
        }
      })
      .addCase(addNewFunctionality.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFunctionalityFromApi.fulfilled, (state, action) => {
        const { apiPk, functionalityPk } = action.payload;
        state.apis = state.apis.map((api) => {
          if (api.api_id === apiPk) {
            return {
              ...api,
              functionalities: api.functionalities.filter(
                (functionality) => functionality.functionality_id !== functionalityPk
              ),
            };
          }
          return api;
        });
      })
      .addCase(removeFunctionalityFromApi.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeApi.pending, (state) => {
        state.loading = true;
        state.api= {};
      })
      .addCase(removeApi.fulfilled, (state, action) => {
        state.loading = false;
        state.api=action.payload;
      })
      .addCase(removeApi.rejected, (state, action) => {
        state.loading = false;
        state.api= {};
        state.error = action.error.message;
      });
  },
});
export const { deleteApiFunctionality ,addFunctionalityToApi,addApiToApis} = apiSlice.actions;
export default apiSlice.reducer;

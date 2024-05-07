import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';
const initialState = {
  objects: [],
  object: {},
  loading: false,
  error: null,
};



export const fetchAllObjectsByVersion= createAsyncThunk(
    "object/fetchAllObjectsByVersion",
    async (versionId) => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-all-objects-by-version/${versionId}`, { headers });
        return response.data;
      } catch (error) {
        throw Error(error.response.data.message || 'Failed to fetch Objects for version');
      }
    }
  );

export const getObject = createAsyncThunk(
    "object/getObject",
    async (id) => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-object/${id}/`, { headers });
        return response.data;
      } catch (error) {
        throw Error(error.response.data.message || 'Failed to fetch subscription plan');
      }
    }
  );


export const updateObject = createAsyncThunk('object/updateObject', async ({ id, data }) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.put(`${BACKEND_BASE_URL}/apis_management/update-object/${id}/`, data, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to update object');
  }
});
export const AddObject = createAsyncThunk(
  'object/addObject',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Token ${token}` };
      const response = await axios.post(`${BACKEND_BASE_URL}/apis_management/add-object/${id}/`, data, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeObject = createAsyncThunk('object/removeObject', async (id) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.delete(`${BACKEND_BASE_URL}/apis_management/delete-object/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to delete object');
  }
});

const objectSlice = createSlice({
  name: 'object',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllObjectsByVersion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllObjectsByVersion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.objects = action.payload;
      })
      .addCase(fetchAllObjectsByVersion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getObject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getObject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.object = action.payload;
      })
      .addCase(getObject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(AddObject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })       
        .addCase(AddObject.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          const newObject = action.payload;
            state.objects.push(newObject);  
        })
      .addCase(AddObject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateObject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateObject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedObject = action.payload;
        const index = state.objects.findIndex((obj) => obj.id === updatedObject.id);
        if (index !== -1) {
          state.objects[index] = updatedObject;
        }
      })
      .addCase(updateObject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(removeObject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeObject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.objects = state.objects.filter((obj) => obj.id !== action.meta.arg);
      })
      .addCase(removeObject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      
  },
});

export default objectSlice.reducer;

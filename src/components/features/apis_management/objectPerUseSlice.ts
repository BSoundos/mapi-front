import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';
const initialState = {
  objectPerUseData: [],
  objectPerUseUser:[],
  objectPerUse:{},
  loading: false,
  error: null,
};



export const fetchObjectPerUseData = createAsyncThunk(
  'objectPerUse/fetchObjectPerUseData',
  async (id) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-object-per-use/${id}/`, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to fetch object per Use data');
    }
  }
);
export const fetchObjectPerUseUser = createAsyncThunk(
  'objectPerUse/fetchObjectPerUseUser',
  async (id) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-object-per-use-user/${id}/`, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to fetch object per Use data');
    }
  }
);
export const createObjectPerUse = createAsyncThunk(
  'objectPerUse/createObjectPerUse',
  async ({ objectId, planId, planType, data }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.post(
        `${BACKEND_BASE_URL}/apis_management/add-object-per-use/${objectId}/${planId}/${planType}/`,
        data,
        { headers }
      );
      return { data: response.data, planType };
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to create object per Use');
    }
  }
);

export const updateObjectPerUse = createAsyncThunk(
  'objectPerUse/updateObjectPerUse',
  async ({ id, data, planType }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.put(
        `${BACKEND_BASE_URL}/apis_management/update-object-per-use/${id}/`,
        data,
        { headers }
      );
      return { data: response.data, planType };
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to update objectPerUse');
    }
  }
);

export const removeObjectPerUse = createAsyncThunk(
  'objectPerUse/removeObjectPerUse',
  async ({ id, planType }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.delete(`${BACKEND_BASE_URL}/apis_management/delete-object-per-use/${id}`, {
        headers,
      });
      return { data: response.data, id, planType };
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to delete feature');
    }
  }
);

const objectPerUseSlice = createSlice({
  name: 'objectPerUse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchObjectPerUseData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchObjectPerUseData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.objectPerUseData = action.payload;
      })
      .addCase(fetchObjectPerUseData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchObjectPerUseUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchObjectPerUseUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.objectPerUseUser = action.payload;
      })
      .addCase(fetchObjectPerUseUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(createObjectPerUse.pending, (state) => {
        state.loading = true;
        state.error = null;
              })
      .addCase(createObjectPerUse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.objectPerUse = action.payload.data;

        if (action.payload.planType === 'sub') {
          const objectIndex = state.objectPerUseData.findIndex(
            (item) => item.object_id === action.payload.data.object
          );
          if (objectIndex !== -1) {
            state.objectPerUseData[objectIndex].object_per_use.push(action.payload.data);
          } else {
            state.objectPerUseData.push({
              object_id: action.payload.data.object,
              object_per_use: [action.payload.data],
            });
          }
        } else {
          const objectIndex = state.objectPerUseUser.findIndex(
            (item) => item.object_id === action.payload.data.object
          );
          if (objectIndex !== -1) {
            state.objectPerUseUser[objectIndex].object_per_use.push(action.payload.data);
          } else {
            state.objectPerUseUser.push({
              object_id: action.payload.data.object,
              object_per_use: [action.payload.data],
            });
          }
        }
      })
      .addCase(createObjectPerUse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
        })
      .addCase(updateObjectPerUse.pending, (state) => {
        state.loading = true;
        state.error = null;
              })
        .addCase(updateObjectPerUse.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.objectPerUse = action.payload.data;
  
          if (action.payload.planType === 'sub') {
            const objectIndex = state.objectPerUseData.findIndex(
              (item) => item.object_id === action.payload.data.object
            );
            if (objectIndex !== -1) {
              const objectUselyIndex = state.objectPerUseData[objectIndex].object_per_use.findIndex(
                (item) => item.id === action.payload.data.id
              );
  
              if (objectUselyIndex !== -1) {
                state.objectPerUseData[objectIndex].object_per_use[objectUselyIndex] =
                  action.payload.data;
              }
            }
          } else {
            const objectIndex = state.objectPerUseUser.findIndex(
              (item) => item.object_id === action.payload.data.object
            );
            if (objectIndex !== -1) {
              const objectUselyIndex = state.objectPerUseUser[objectIndex].object_per_use.findIndex(
                (item) => item.id === action.payload.data.id
              );
  
              if (objectUselyIndex !== -1) {
                state.objectPerUseUser[objectIndex].object_per_use[objectUselyIndex] =
                  action.payload.data;
              }
            }
          }
        })
      .addCase(updateObjectPerUse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
        })
      .addCase(removeObjectPerUse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeObjectPerUse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (action.payload.planType === 'sub') {
          const objectIndex = state.objectPerUseData.findIndex((item) =>
            item.object_per_use.some((obj) => obj.id === action.payload.id)
          );
          if (objectIndex !== -1) {
            const objectUselyIndex = state.objectPerUseData[objectIndex].object_per_use.findIndex(
              (item) => item.id === action.payload.id
            );
            if (objectUselyIndex !== -1) {
              state.objectPerUseData[objectIndex].object_per_use.splice(objectUselyIndex, 1);
            }
            if (state.objectPerUseData[objectIndex].object_per_use.length === 0) {
              state.objectPerUseData.splice(objectIndex, 1);
            }
          }
        } else {
          const objectIndex = state.objectPerUseUser.findIndex((item) =>
            item.object_per_use.some((obj) => obj.id === action.payload.id)
          );
          if (objectIndex !== -1) {
            const objectUselyIndex = state.objectPerUseUser[objectIndex].object_per_use.findIndex(
              (item) => item.id === action.payload.id
            );
            if (objectUselyIndex !== -1) {
              state.objectPerUseUser[objectIndex].object_per_use.splice(objectUselyIndex, 1);
            }
            if (state.objectPerUseUser[objectIndex].object_per_use.length === 0) {
              state.objectPerUseUser.splice(objectIndex, 1);
            }
          }
        }
      })
      .addCase(removeObjectPerUse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
  },
});

export default objectPerUseSlice.reducer;
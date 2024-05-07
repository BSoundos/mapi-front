import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';
const initialState = {
  objectPerMonthData: [],
  objectPerMonthUser:[],
  objectMonthly:{},
  loading: false,
  error: null,
};




export const fetchObjectPerMonthData = createAsyncThunk(
  'objectPerMonth/fetchObjectPerMonthData',
  async (id) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-object-monthly/${id}/`, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to fetch object per month data');
    }
  }
);
export const fetchObjectPerMonthUser = createAsyncThunk(
  'objectPerMonth/fetchObjectPerMonthUser',
  async (id) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-object-monthly-user/${id}/`, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to fetch object per month data');
    }
  }
);

export const createObjectPerMonth = createAsyncThunk(
  'objectPerMonth/createObjectPerMonth',
  async ({ objectId, planId, planType, data }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.post(
        `${BACKEND_BASE_URL}/apis_management/add-object-monthly/${objectId}/${planId}/${planType}/`,
        data,
        { headers }
      );
      return { data: response.data, planType };
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to create object per month');
    }
  }
);

export const updateObjectPerMonth = createAsyncThunk(
  'objectPerMonth/updateObjectPerMonth',
  async ({ id, data, planType }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.put(
        `${BACKEND_BASE_URL}/apis_management/update-object-monthly/${id}/`,
        data,
        { headers }
      );
      return { data: response.data, planType };
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to update objectPerMonth');
    }
  }
);

export const removeObjectPerMonth = createAsyncThunk(
  'objectPerMonth/removeObjectPerMonth',
  async ({ id, planType }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.delete(
        `${BACKEND_BASE_URL}/apis_management/delete-object-monthly/${id}`,
        { headers }
      );
      return { data: response.data, id, planType };
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to delete feature');
    }
  }
);


const objectPerMonthSlice = createSlice({
  name: 'objectPerMonth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchObjectPerMonthData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchObjectPerMonthData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.objectPerMonthData = action.payload;
      })
      .addCase(fetchObjectPerMonthData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchObjectPerMonthUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchObjectPerMonthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.objectPerMonthUser = action.payload;
      })
      .addCase(fetchObjectPerMonthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(createObjectPerMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
              })
      .addCase(createObjectPerMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.objectMonthly = action.payload.data;

        if (action.payload.planType === 'sub') {
          const objectIndex = state.objectPerMonthData.findIndex(
            (item) => item.object_id === action.payload.data.object
          );
          if (objectIndex !== -1) {
            state.objectPerMonthData[objectIndex].object_monthly.push(action.payload.data);
          } else {
            state.objectPerMonthData.push({
              object_id: action.payload.data.object,
              object_monthly: [action.payload.data],
            });
          }
        } else {
          const objectIndex = state.objectPerMonthUser.findIndex(
            (item) => item.object_id === action.payload.data.object
          );
          if (objectIndex !== -1) {
            state.objectPerMonthUser[objectIndex].object_monthly.push(action.payload.data);
          } else {
            state.objectPerMonthUser.push({
              object_id: action.payload.data.object,
              object_monthly: [action.payload.data],
            });
          }
        }
      })
      .addCase(createObjectPerMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
        })
      .addCase(updateObjectPerMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
              })
        .addCase(updateObjectPerMonth.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.objectMonthly = action.payload.data;
  
          if (action.payload.planType === 'sub') {
            const objectIndex = state.objectPerMonthData.findIndex(
              (item) => item.object_id === action.payload.data.object
            );
            if (objectIndex !== -1) {
              const objectMonthlyIndex = state.objectPerMonthData[objectIndex].object_monthly.findIndex(
                (item) => item.id === action.payload.data.id
              );
  
              if (objectMonthlyIndex !== -1) {
                state.objectPerMonthData[objectIndex].object_monthly[objectMonthlyIndex] =
                  action.payload.data;
              }
            }
          } else {
            const objectIndex = state.objectPerMonthUser.findIndex(
              (item) => item.object_id === action.payload.data.object
            );
            if (objectIndex !== -1) {
              const objectMonthlyIndex = state.objectPerMonthUser[objectIndex].object_monthly.findIndex(
                (item) => item.id === action.payload.data.id
              );
  
              if (objectMonthlyIndex !== -1) {
                state.objectPerMonthUser[objectIndex].object_monthly[objectMonthlyIndex] =
                  action.payload.data;
              }
            }
          }})   
        .addCase(updateObjectPerMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
        })
      .addCase(removeObjectPerMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeObjectPerMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (action.payload.planType === 'sub') {
          const objectIndex = state.objectPerMonthData.findIndex((item) =>
            item.object_monthly.some((obj) => obj.id === action.payload.id)
          );
          if (objectIndex !== -1) {
            const objectMonthlyIndex =
              state.objectPerMonthData[objectIndex].object_monthly.findIndex(
                (item) => item.id === action.payload.id
              );
            if (objectMonthlyIndex !== -1) {
              state.objectPerMonthData[objectIndex].object_monthly.splice(objectMonthlyIndex, 1);
            }
            if (state.objectPerMonthData[objectIndex].object_monthly.length === 0) {
              state.objectPerMonthData.splice(objectIndex, 1);
            }
          }
        } else {
          const objectIndex = state.objectPerMonthUser.findIndex((item) =>
            item.object_monthly.some((obj) => obj.id === action.payload.id)
          );
          if (objectIndex !== -1) {
            const objectMonthlyIndex =
              state.objectPerMonthUser[objectIndex].object_monthly.findIndex(
                (item) => item.id === action.payload.id
              );
            if (objectMonthlyIndex !== -1) {
              state.objectPerMonthUser[objectIndex].object_monthly.splice(objectMonthlyIndex, 1);
            }
            if (state.objectPerMonthUser[objectIndex].object_monthly.length === 0) {
              state.objectPerMonthUser.splice(objectIndex, 1);
            }
          }
        }
      })
      .addCase(removeObjectPerMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
  },
});

export default objectPerMonthSlice.reducer;
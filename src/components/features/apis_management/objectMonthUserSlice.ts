import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';
const initialState = {
  objectPerMonthUser:[],
  objectMonthly:{},
  loading: false,
  error: null,
};

export const fetchObjectMonthUser = createAsyncThunk(
  'objectMonthUser/fetchObjectPerMonthData',
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

export const createObjectMonthUser = createAsyncThunk(
    'objectMonthUser/createObjectPerMonth',
    async ({ objectId, planId,planType, data }) => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.post(`${BACKEND_BASE_URL}/apis_management/add-object-monthly/${objectId}/${planId}/${planType}/`, data, { headers });
        return response.data;
      } catch (error) {
        throw Error(error.response.data.message || 'Failed to create object per month');
      }
    }
  );

export const updateObjectMonthUser = createAsyncThunk('objectMonthUser/updateObjectPerMonth', async ({ id, data }) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.put(`${BACKEND_BASE_URL}/apis_management/update-object-monthly/${id}/`, data, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to update objectPerMonth');
  }
});
export const removeObjectMonthUser = createAsyncThunk('objectMonthUser/removeObjectPerMonth', async (id) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.delete(`${BACKEND_BASE_URL}/apis_management/delete-object-monthly/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to delete feature');
  }
});

const objectMonthUserSlice = createSlice({
  name: 'objectMonthUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchObjectMonthUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchObjectMonthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.objectPerMonthUser = action.payload;
      })
      .addCase(fetchObjectMonthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(createObjectMonthUser.pending, (state) => {
        state.loading = true;
        state.error = null;
              })
      .addCase(createObjectMonthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.objectMonthly = action.payload;
        const objectIndex = state.objectPerMonthUser.findIndex(
          (item) => item.object_id === action.payload.object
        )
        if (objectIndex !== -1) {
          state.objectPerMonthUser[objectIndex].object_monthly_user.push(action.payload);
        } else {
          state.objectPerMonthUser.push({object_id: action.payload.object,object_monthly_user: [action.payload],
          })
        }
      })
      .addCase(createObjectMonthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
        })
      .addCase(updateObjectMonthUser.pending, (state) => {
        state.loading = true;
        state.error = null;
              })
      .addCase(updateObjectMonthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.objectMonthly = action.payload;
        const objectIndex = state.objectPerMonthUser.findIndex(
          (item) => item.object_id === action.payload.object
        );
          if (objectIndex !== -1) {
            const objectMonthlyIndex = state.objectPerMonthUser[objectIndex].object_monthly_user.findIndex(
              (item) => item.id === action.payload.id
            );
        
            if (objectMonthlyIndex !== -1) {
              state.objectPerMonthUser[objectIndex].object_monthly_user[objectMonthlyIndex] = action.payload;
            }
          }
       })
      .addCase(updateObjectMonthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        })
      .addCase(removeObjectMonthUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeObjectMonthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const objectIndex = state.objectPerMonthUser.findIndex((item) =>
          item.object_monthly_user.some((obj) => obj.id === action.meta.arg)
        );
        if (objectIndex !== -1) {
          const objectMonthlyIndex = state.objectPerMonthUser[objectIndex].object_monthly_user.findIndex(
            (item) => item.id === action.meta.arg
          );      
          if (objectMonthlyIndex !== -1) {
            state.objectPerMonthUser[objectIndex].object_monthly_user.splice(objectMonthlyIndex, 1);
          }
          if (state.objectPerMonthUser[objectIndex].object_monthly_user.length === 0) {
            state.objectPerMonthUser.splice(objectIndex, 1);
          }
        }
      })
      .addCase(removeObjectMonthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
  },
});

export default objectMonthUserSlice.reducer;
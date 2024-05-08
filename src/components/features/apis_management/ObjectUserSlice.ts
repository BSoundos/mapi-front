import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';
const initialState = {
  objectPerUseUser: [],
  objectPerUse:{},
  loading: false,
  error: null,
};



export const fetchObjectPerUseUser = createAsyncThunk(
  'objectPerUseUser/fetchObjectPerUseUser',
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
      throw Error(error.response.User.message || 'Failed to fetch object per Use User');
    }
  }
);

export const createObjectPerUse = createAsyncThunk(
    'objectPerUseUser/createObjectPerUse',
    async ({ objectId, planId,planType, data }) => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.post(`${BACKEND_BASE_URL}/apis_management/add-object-per-use/${objectId}/${planId}/${planType}/`, data, { headers });
        return response.data;
      } catch (error) {
        throw Error(error.response.User.message || 'Failed to create object per Use');
      }
    }
  );

export const updateObjectPerUse = createAsyncThunk('objectPerUseUser/updateObjectPerUse', async ({ id, User }) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.put(`${BACKEND_BASE_URL}/apis_management/update-object-per-use/${id}/`, User, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.User.message || 'Failed to update objectPerUse');
  }
});
export const removeObjectPerUse = createAsyncThunk('objectPerUseUser/removeObjectPerUse', async (id) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.delete(`${BACKEND_BASE_URL}/apis_management/delete-object-per-use/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to delete feature');
  }
});

const objectUserSlice = createSlice({
  name: 'objectPerUseUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        state.error = action.error.message;
      })
      .addCase(createObjectPerUse.pending, (state) => {
        state.loading = true;
        state.error = null;
              })
      .addCase(createObjectPerUse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.objectPerUse = action.payload;
        const objectIndex = state.objectPerUseUser.findIndex(
          (item) => item.object_id === action.payload.object
        )
        if (objectIndex !== -1) {
          state.objectPerUseUser[objectIndex].object_per_use_user.push(action.payload);
        } else {
          state.objectPerUseUser.push({object_id: action.payload.object,object_per_use_user: [action.payload],
          })
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
        state.objectPerUse = action.payload;
        const objectIndex = state.objectPerUseUser.findIndex(
          (item) => item.object_id === action.payload.object
        );
          if (objectIndex !== -1) {
            const objectUselyIndex = state.objectPerUseUser[objectIndex].object_per_use_user.findIndex(
              (item) => item.id === action.payload.id
            );
        
            if (objectUselyIndex !== -1) {
              state.objectPerUseUser[objectIndex].object_per_use_user[objectUselyIndex] = action.payload;
            }
          }
       })
      .addCase(updateObjectPerUse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        })
      .addCase(removeObjectPerUse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeObjectPerUse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const objectIndex = state.objectPerUseUser.findIndex((item) =>
          item.object_per_use_user.some((obj) => obj.id === action.meta.arg)
        );
        if (objectIndex !== -1) {
          const objectUselyIndex = state.objectPerUseUser[objectIndex].object_per_use_user.findIndex(
            (item) => item.id === action.meta.arg
          );      
          if (objectUselyIndex !== -1) {
            state.objectPerUseUser[objectIndex].object_per_use_user.splice(objectUselyIndex, 1);
          }
          if (state.objectPerUseUser[objectIndex].object_per_use_user.length === 0) {
            state.objectPerUseUser.splice(objectIndex, 1);
          }
        }
      })
      .addCase(removeObjectPerUse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
  },
});

export default objectUserSlice.reducer;
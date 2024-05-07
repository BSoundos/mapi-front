import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';
const initialState = {
  privatePlans: [],
  privatePlan: {},
  loading: false,
  error: null,
};


export const fetchAllPrivatePlansByVersion= createAsyncThunk(
    "privatePlan/fetchAllprivatePlansByVersion",
    async (versionId) => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-all-user-plans-by-version/${versionId}`, { headers });
        return response.data;
      } catch (error) {
        throw Error(error.response.data.message || 'Failed to fetch private plans for version');
      }
    }
  );

export const getPrivatePlan = createAsyncThunk(
    "privatePlan/getprivatePlan",
    async (id) => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/private-plans/${id}/`, { headers });
        return response.data;
      } catch (error) {
        throw Error(error.response.data.message || 'Failed to fetch private plan');
      }
    }
  );



  
 
  export const updatePrivatePlan = createAsyncThunk<
    { rejectValue: string }
  >('privatePlan/updatePrivatePlan', async ({ id, data }, {rejectWithValue}) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Token ${token}` };
      const response = await axios.put(
        `${BACKEND_BASE_URL}/apis_management/update-user-plan/${id}/`,
        data,
        { headers }
      );
      return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.error || 'Failed to update plan';
            return rejectWithValue(errorMessage);
          }else{
            throw error;
          }
    }
  });
  export const addPrivatePlan = createAsyncThunk<
    { rejectValue: string }
  >('privatePlan/addPrivatePlan', async ({ id, data }, {rejectWithValue}) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Token ${token}` };
      const response = await axios.post(
        `${BACKEND_BASE_URL}/apis_management/add-user-plan/${id}/`,
        data,
        { headers }
      );
      return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.error || 'Failed to update plan';
            return rejectWithValue(errorMessage);
          }else{
            throw error;
          }
    }
  });
export const removePrivatePlan = createAsyncThunk('privatePlan/removePrivatePlan', async (id) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.delete(`${BACKEND_BASE_URL}/apis_management/delete-user-plan/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to delete private plan');
  }
});

const privatePlanSlice = createSlice({
  name: 'privatePlan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPrivatePlansByVersion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPrivatePlansByVersion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.privatePlans = action.payload;
      })
      .addCase(fetchAllPrivatePlansByVersion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getPrivatePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrivatePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.privatePlan = action.payload;
      })
      .addCase(getPrivatePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(addPrivatePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })       
      .addCase(addPrivatePlan.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          const newPlan = action.payload;
            state.privatePlans.push(newPlan);  
        })
      .addCase(addPrivatePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updatePrivatePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePrivatePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedPlan = action.payload;
        const index = state.privatePlans.findIndex((plan) => plan.id === updatedPlan.id);
        if (index !== -1) {
          state.privatePlans[index] = updatedPlan;
        }
      })
      .addCase(updatePrivatePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(removePrivatePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePrivatePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.privatePlans = state.privatePlans.filter(
          (plan) => plan.id !== action.meta.arg
        );
      })
      .addCase(removePrivatePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  },
});

export default privatePlanSlice.reducer;

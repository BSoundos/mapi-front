import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';
const initialState = {
  promotions: [],
  promotion: {},
  loading: false,
  error: null,
};


export const fetchAllPromotionsByVersion= createAsyncThunk(
    "promotion/fetchAllPromotionsByVersion",
    async (versionId) => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-all-promotions-by-version/${versionId}`, { headers });
        return response.data;
      } catch (error) {
        throw Error(error.response.data.message || 'Failed to fetch promotions for version');
      }
    }
  );

export const getPromotion = createAsyncThunk(
    "promotion/getPromotion",
    async (id) => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-promotion/${id}/`, { headers });
        return response.data;
      } catch (error) {
        throw Error(error.response.data.message || 'Failed to fetch subscription plan');
      }
    }
  );

  
export const updatePromotion = createAsyncThunk('promotion/updatePromotion', async ({ id, data }) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.put(`${BACKEND_BASE_URL}/apis_management/update-promotion/${id}/`, data, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to update promotion');
  }
});
export const addPromotion = createAsyncThunk(
  'promotion/addPromotion',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Token ${token}` };
      const response = await axios.post(`${BACKEND_BASE_URL}/apis_management/add-promotion/${id}/`, data, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removePromotion = createAsyncThunk('promotion/removePromotion', async (id) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.delete(`${BACKEND_BASE_URL}/apis_management/delete-promotion/${id}/`, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to delete promotion');
  }
});


const promotionSlice = createSlice({
  name: 'promotion',
  initialState,
  reducers: {
    clearPromotionError: (state) => {
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPromotionsByVersion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPromotionsByVersion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.promotions = action.payload;
      })
      .addCase(fetchAllPromotionsByVersion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getPromotion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPromotion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.promotion = action.payload;
      })
      .addCase(getPromotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(addPromotion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })       
      .addCase(addPromotion.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          const newpromotion = action.payload;
            state.promotions.push(newpromotion);  
        })
      .addCase(addPromotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updatePromotion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePromotion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedPromotion = action.payload;
        const index = state.promotions.findIndex((promotion) => promotion.id === updatedPromotion.id);
        if (index !== -1) {
          state.promotions[index] = updatedPromotion;
        }
      })
      .addCase(updatePromotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(removePromotion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePromotion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.promotions = state.promotions.filter((promotion) => promotion.id !== action.meta.arg);
      })
      .addCase(removePromotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
      
      
  },
});
  export const { clearPromotionError } = promotionSlice.actions;

export default promotionSlice.reducer;

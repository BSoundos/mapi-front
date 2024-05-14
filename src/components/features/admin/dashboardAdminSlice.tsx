import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@/app/store';
import { BACKEND_BASE_URL } from '@/data/constants';

// Interface pour spécifier la forme de l'état initial
interface AdminState {
  providerCount: number;
  userCount: number;
  apisPurchasesCount: number;
  totalEarnings: number;
  totalEarningsPerMonth : number;
  loading: boolean;
  categoryPercentages: { [key: string]: number }; 
  topApis: { id: number; name: string; votes: number }[]; 
  error: string | null; 
}

const initialState: AdminState = {
  providerCount: 0,
  userCount: 0,
  apisPurchasesCount: 0,
  totalEarnings: 0,
  totalEarningsPerMonth : 0,
  categoryPercentages: {}, 
  topApis: [],
  loading: false,
  error: null,
};

// Fonction utilitaire pour obtenir le token depuis le localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

export const ProviderCount = createAsyncThunk(
  'admin/providerCount',
  async () => {
    // Récupérer le token
    const token = getToken();

    try {
      // Effectuer une requête HTTP GET pour obtenir le nombre de fournisseurs actifs
      const response = await axios.get(
        `${BACKEND_BASE_URL}/ATPA/count_active_providers/`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      // Retourner les données obtenues depuis le serveur si nécessaire
      return response.data.provider_count;
    } catch (error) {
      // Gérer les erreurs si nécessaire
      throw error;
    }
  }
);

export const UserCount = createAsyncThunk(
  'admin/userCount',
  async () => {
    // Récupérer le token
    const token = getToken();

    try {
      // Effectuer une requête HTTP GET pour obtenir le nombre d'utilisateurs
      const response = await axios.get(
        `${BACKEND_BASE_URL}/ATPA/count_users/`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );

      // Retourner les données obtenues depuis le serveur si nécessaire
      return response.data.user_count;
    } catch (error) {
      // Gérer les erreurs si nécessaire
      throw error;
    }
  }
);

export const ApisPurchasesCount = createAsyncThunk(
  'admin/apisPurchasesCount',
  async () => {
    // Récupérer le token
    const token = getToken();

    try {
      // Effectuer une requête HTTP GET pour obtenir le nombre d'achats d'API
      const response = await axios.get(
        `${BACKEND_BASE_URL}/ATPA/count_apis_purchases/`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );

      // Retourner les données obtenues depuis le serveur si nécessaire
      return response.data.total_api_count;
    } catch (error) {
      // Gérer les erreurs si nécessaire
      throw error;
    }
  }
);

export const TotalEarningsPerMonth = createAsyncThunk(
  'admin/totalEarningsPerMonth',
  async () => {
    // Récupérer le token
    const token = getToken();

    try {
      // Effectuer une requête HTTP GET pour obtenir les gains totaux
      const response = await axios.get(
        `${BACKEND_BASE_URL}/ATPA/count_total_earnings_per_month/`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );

      // Retourner les données obtenues depuis le serveur si nécessaire
      return response.data.total_earnings;
    } catch (error) {
      // Gérer les erreurs si nécessaire
      throw error;
    }
  }
);
export const TotalEarnings = createAsyncThunk(
  'admin/totalEarnings',
  async () => {
    // Récupérer le token
    const token = getToken();

    try {
      // Effectuer une requête HTTP GET pour obtenir les gains totaux
      const response = await axios.get(
        `${BACKEND_BASE_URL}/ATPA/count_total_earnings/`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );

      // Retourner les données obtenues depuis le serveur si nécessaire
      return response.data.total_earnings;
    } catch (error) {
      // Gérer les erreurs si nécessaire
      throw error;
    }
  }
);
export const ApiCategoryPercentages = createAsyncThunk(
  'admin/apiCategoryPercentages',
  async () => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${BACKEND_BASE_URL}/ATPA/apis_per_category/`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      return response.data.category_percentages;
    } catch (error) {
      throw error;
    }
  }
);

export const FetchTopApis = createAsyncThunk(
  'admin/fetchTopApis',
  async () => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${BACKEND_BASE_URL}/ATPA/top_apis_votes/`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ProviderCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(ProviderCount.fulfilled, (state, action) => {
        state.providerCount = action.payload;
        state.loading = false;
      })
      .addCase(ProviderCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(UserCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserCount.fulfilled, (state, action) => {
        state.userCount = action.payload;
        state.loading = false;
      })
      .addCase(UserCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(ApisPurchasesCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(ApisPurchasesCount.fulfilled, (state, action) => {
        state.apisPurchasesCount = action.payload;
        state.loading = false;
      })
      .addCase(ApisPurchasesCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(TotalEarnings.pending, (state) => {
        state.loading = true;
      })
      .addCase(TotalEarnings.fulfilled, (state, action) => {
        state.totalEarnings = action.payload;
        state.loading = false;
      })
      .addCase(TotalEarnings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(TotalEarningsPerMonth.pending, (state) => {
        state.loading = true;
      })
      .addCase(TotalEarningsPerMonth.fulfilled, (state, action) => {
        state.totalEarningsPerMonth = action.payload;
        state.loading = false;
      })
      .addCase(TotalEarningsPerMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(ApiCategoryPercentages.pending, (state) => {
        state.loading = true;
      })
      .addCase(ApiCategoryPercentages.fulfilled, (state, action) => {
        state.categoryPercentages = action.payload;
        state.loading = false;
      })
      .addCase(ApiCategoryPercentages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(FetchTopApis.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchTopApis.fulfilled, (state, action) => {
        state.topApis = action.payload;
        state.loading = false;
      })
      .addCase(FetchTopApis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

  },
});

export default adminSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@/app/store';
import { BACKEND_BASE_URL } from '@/data/constants';


interface ProviderEarnings {
  provider_id: number;
  provider_name: string;
  total_amount: number;
}
interface TopSellingAPI {
  api_name: string;
  category: string;
  total_earnings: number;
}
interface MonthlySubscriptionData {
  month: number; // Numéro du mois (1 pour janvier, 2 pour février, etc.)
  totalAmount: number; // Montant total des abonnements pour le mois
}

interface YearlyData {
  year: number; // Année des données
  monthlyData: MonthlySubscriptionData[]; // Données mensuelles des abonnements
}

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
  yearlyData?: YearlyData; // Ajouter la propriété yearlyData
  error: string | null; 
  topPayingProviders: ProviderEarnings[];
  topSellingApi : TopSellingAPI[];

}


const initialState: AdminState = {
  providerCount: 0,
  userCount: 0,
  apisPurchasesCount: 0,
  totalEarnings: 0,
  totalEarningsPerMonth : 0,
  categoryPercentages: {}, 
  topApis: [],
  topPayingProviders: [],
  topSellingApi : [],
  loading: false,
  error: null,
};
// Définir le type pour les données renvoyées par l'API
interface TopSellingAPI {
  api_name: string;
  category: string;
  total_earnings: number;
}


// Fonction utilitaire pour obtenir le token depuis le localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Créer un thunk asynchrone pour récupérer les 3 meilleures API du mois
export const fetchTopSellingAPIs = createAsyncThunk<TopSellingAPI[], void>(
  'admin/fetchTopSellingAPIs',
  async () => {
    try {
      const response = await axios.get<TopSellingAPI[]>(`${BACKEND_BASE_URL}/ATPA/top-selling-apis/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
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

export const fetchYearlyData = createAsyncThunk<any, number>('admin/fetchYearlyData', async (selectedYear) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/ATPA/user_subscriptions_yearly/${selectedYear}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log("response.data",response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchTopPayingProviders = createAsyncThunk('admin/fetchTopPayingProviders', async () => {
  const token = getToken();
  const response = await axios.get(`${BACKEND_BASE_URL}/ATPA/top_paying_providers_this_month/`, {
    headers: { Authorization: `Token ${token}` }
  });
  return response.data;
});

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
      })
      .addCase(fetchYearlyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchYearlyData.fulfilled, (state, action) => {
        state.yearlyData = action.payload; 
        console.log("state.yearlyData",state.yearlyData);

        state.loading = false;
      })
      .addCase(fetchYearlyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTopPayingProviders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopPayingProviders.fulfilled, (state, action: PayloadAction<ProviderEarnings[]>) => {
        state.topPayingProviders = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopPayingProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch top paying providers';
      })
      .addCase(fetchTopSellingAPIs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopSellingAPIs.fulfilled, (state, action) => {
        state.topSellingApi  = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopSellingAPIs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
 

  },
});

export default adminSlice.reducer;

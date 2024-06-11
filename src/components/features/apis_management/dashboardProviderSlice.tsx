import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@/app/store';
import { BACKEND_BASE_URL } from '@/data/constants';
import { User } from '@/types/user';

// Interface pour spécifier la forme de l'état initial
export interface APIEarning{
    name: string;
    category: string;
    total_earnings: number;
    tax_earnings: number;
}

interface MonthlyData {
    labels: string[];
    counts: number[];
    totalEarnings: number[];
  }
  
interface YearlyData {
labels: string[];
counts: number[];
totalEarnings: number[];
}
  
interface UserSubscription {
monthlyData: MonthlyData;
yearlyData: YearlyData;
}

interface ProviderActivityState {
  provider: User | null;
  subscribedUsers: number;
  publishedApis: number;
  totalEarningsPerMonth : number;
  totalEarnings: number;
  apiEarning: APIEarning[];
  userSubscription: UserSubscription[];
  loading: boolean;
  error: string | null; 
}

const initialState: ProviderActivityState = {
  provider: null,
  subscribedUsers: 0,
  publishedApis: 0,
  totalEarningsPerMonth: 0,
  totalEarnings : 0,
  apiEarning: [],
  userSubscription: [],
  loading: false,
  error: null,
};

// Fonction utilitaire pour obtenir le token depuis le localStorage
const getToken = () => {
  return localStorage.getItem('token');
};


export const fetchProviderInfo = createAsyncThunk<User, number>(
    'provider/fetchProviderInfo',
    async (providerId: number) => {
      // Récupérer le token
      const token = getToken();
  
      try {
        // Effectuer une requête HTTP GET pour obtenir le nombre de fournisseurs actifs
        const response = await axios.get(
          `${BACKEND_BASE_URL}/accounts-management/provider/${providerId}`,
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        );
        // Retourner les données obtenues depuis le serveur si nécessaire
        return response.data;
      } catch (error) {
        // Gérer les erreurs si nécessaire
        throw error;
      }
    }
  );

export const fetchSubscribedUsers = createAsyncThunk<number, number>(
    'provider/subscribedUsers',
  async (providerId: number) => {
    // Récupérer le token
    const token = getToken();

    try {
      // Effectuer une requête HTTP GET pour obtenir le nombre de fournisseurs actifs
      const response = await axios.get(
        `${BACKEND_BASE_URL}/ATPA/count_subscribed_users_count/${providerId}`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      // Retourner les données obtenues depuis le serveur si nécessaire
      return response.data.subscribed_user_count;
    } catch (error) {
      // Gérer les erreurs si nécessaire
      throw error;
    }
  }
);
export const fetchPublishedApis = createAsyncThunk<number, number>(
    'provider/publishedApis',
  async (providerId: number) => {
    // Récupérer le token
    const token = getToken();

    try {
      // Effectuer une requête HTTP GET pour obtenir le nombre de fournisseurs actifs
      const response = await axios.get(
        `${BACKEND_BASE_URL}/ATPA/count_published_api/${providerId}`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      // Retourner les données obtenues depuis le serveur si nécessaire
      return response.data.api_published_count;
    } catch (error) {
      // Gérer les erreurs si nécessaire
      throw error;
    }
  }
);
export const fetchTotalEarningsPerMonth = createAsyncThunk<number, number>(
    'provider/totalEarningsPerMonth',
  async (providerId: number) => {
    // Récupérer le token
    const token = getToken();

    try {
      // Effectuer une requête HTTP GET pour obtenir le nombre de fournisseurs actifs
      const response = await axios.get(
        `${BACKEND_BASE_URL}/ATPA/total-month-earnings/${providerId}`,
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

export const fetchTotalEarnings = createAsyncThunk<number, number>(
    'provider/totalEarnings',
  async (providerId: number) => {
    // Récupérer le token
    const token = getToken();

    try {
      // Effectuer une requête HTTP GET pour obtenir le nombre de fournisseurs actifs
      const response = await axios.get(
        `${BACKEND_BASE_URL}/ATPA/total-earnings/${providerId}`,
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

export const fetchAPIEarning = createAsyncThunk<APIEarning, number>(
    'provider/APIEarning',
  async (providerId: number) => {
    // Récupérer le token
    const token = getToken();

    try {
      // Effectuer une requête HTTP GET pour obtenir le nombre de fournisseurs actifs
      const response = await axios.get(
        `${BACKEND_BASE_URL}/ATPA/api-earnings/${providerId}`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      console.log(response.data)
      // Retourner les données obtenues depuis le serveur si nécessaire
      return response.data;

    } catch (error) {
      // Gérer les erreurs si nécessaire
      throw error;
    }
  }
);

export const fetchUserSubscription = createAsyncThunk<UserSubscription, number>(
    'provider/userSubscription',
  async (providerId: number) => {
    // Récupérer le token
    const token = getToken();

    try {
      // Effectuer une requête HTTP GET pour obtenir le nombre de fournisseurs actifs
      const response = await axios.get(
        `${BACKEND_BASE_URL}/ATPA/user-subscription-data/${providerId}`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      // Retourner les données obtenues depuis le serveur si nécessaire
      console.log(response.data)
      return response.data;
    } catch (error) {
      // Gérer les erreurs si nécessaire
      throw error;
    }
  }
);


const ProviderActivitySlice = createSlice({
  name: 'providerActivity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviderInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProviderInfo.fulfilled, (state, action) => {
        state.provider = action.payload;
        state.loading = false;
      })
      .addCase(fetchProviderInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(fetchSubscribedUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscribedUsers.fulfilled, (state, action) => {
        state.subscribedUsers = action.payload;
        state.loading = false;
      })
      .addCase(fetchSubscribedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(fetchPublishedApis.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublishedApis.fulfilled, (state, action) => {
        state.publishedApis = action.payload;
        state.loading = false;
      })
      .addCase(fetchPublishedApis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(fetchTotalEarningsPerMonth.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTotalEarningsPerMonth.fulfilled, (state, action) => {
        state.totalEarningsPerMonth = action.payload;
        state.loading = false;
      })
      .addCase(fetchTotalEarningsPerMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(fetchTotalEarnings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTotalEarnings.fulfilled, (state, action) => {
        state.totalEarnings= action.payload;
        state.loading = false;
      })
      .addCase(fetchTotalEarnings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(fetchAPIEarning.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAPIEarning.fulfilled, (state, action) => {
        state.apiEarning = action.payload;
        state.loading = false;
      })
      .addCase(fetchAPIEarning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(fetchUserSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserSubscription.fulfilled, (state, action) => {
        state.userSubscription= [action.payload];
        state.loading = false;
      })
      .addCase(fetchUserSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

    ;

  },
});

export default ProviderActivitySlice.reducer;

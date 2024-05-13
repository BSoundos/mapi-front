import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';


interface RevenueReport {
  date?: string;
  week?: number;
  month?: number;
  amount: number;
}

interface EarningsStatistics {
  total_earnings_to_date: number;
  average_selling_price: number;
  total_purchases: number;
  earnings_this_month: number;
}

interface RevenueState {
  earnings: EarningsStatistics | null;
  revenueReport: RevenueReport[];
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: RevenueState = {
  earnings: null,
  revenueReport: [],
  loading: false,
  error: null,
};

// Function to get the authorization token
const getToken = () => {
  return localStorage.getItem('token');
};

// Async thunk to fetch earnings statistics
export const fetchEarningsStatistics = createAsyncThunk<EarningsStatistics>(
  'revenue/fetchEarningsStatistics',
  async () => {
    const token = getToken();
    const response = await axios.get(
      `${BACKEND_BASE_URL}/apis_management/revenue/earnings-statistics/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  }
);

// // Async thunk to fetch revenue reports based on time range and year
// export const fetchRevenueReport = createAsyncThunk<RevenueReport[], { timeRange: string; year?: number }>(
//   'revenue/fetchRevenueReport',
//   async ({ timeRange, year }) => {
//     const token = getToken();
//     let url = `${BACKEND_BASE_URL}/apis_management/revenue-report/?time_range=${timeRange}`;
//     if (year) {
//       url += `&year=${year}`;
//     }
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     });
//     return response.data;
//   }
// );

export const fetchRevenueReport = createAsyncThunk<RevenueReport[], { timeRange: string; year?: number; month?: number; week?: number }>(
  'revenue/fetchRevenueReport',
  async ({ timeRange, year, month, week }) => {
    const token = getToken();
    let url = `${BACKEND_BASE_URL}/apis_management/revenue-report/?time_range=${timeRange}`;

    if (year) {
      url += `&year=${year}`;
    }

    if (month) {
      url += `&month=${month}`; // Add month to the URL
    }

    if (week) {
      url += `&week=${week}`; // Add week to the URL
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return response.data;
  }
);

// Create Redux slice
const statsSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle earnings statistics
    builder.addCase(fetchEarningsStatistics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchEarningsStatistics.fulfilled, (state, action) => {
      state.loading = false;
      state.earnings = action.payload;
    });

    builder.addCase(fetchEarningsStatistics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch earnings statistics';
    });

    // Handle revenue reports
    builder.addCase(fetchRevenueReport.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchRevenueReport.fulfilled, (state, action) => {
      state.loading = false;
      state.revenueReport = action.payload; 
    });

    builder.addCase(fetchRevenueReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch revenue report';
    });
  },
});

export default statsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';
import { User } from '@/types/user';


interface Review {
  id: number;
  comment: string;
  rating: number;
  user: User;
  review_date: string;
}


interface ReviewState {
  reviews: Review[]; 
  review : Review;
  loading: boolean; 
  error: string | null; 
}

const initialState: ReviewState = {
  reviews: [], 
  review: null,
  loading: false, 
  error: null, 
};


const getToken = () => {
  return localStorage.getItem('token'); 
};


export const fetchReviewsByApiId = createAsyncThunk<Review[], number>(
  'reviews/fetchReviewsByApiId',
  async (apiId: number) => {
    const token = getToken();
    const response = await axios.get(
      `${BACKEND_BASE_URL}/support_hub/api/${apiId}/reviews/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response.data; 
  }
);


export const addReview = createAsyncThunk<
  Review,
  { apiId: number; comment: string; rating: number }
>(
  'reviews/addReview',
  async ({ apiId, comment, rating }) => {
    const token = getToken();
    const response = await axios.post(
      `${BACKEND_BASE_URL}/support_hub/add-review/${apiId}/`,
      { comment, rating },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data; 
  }
);


const ReviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {}
  ,
  extraReducers: (builder) => {
    builder.addCase(fetchReviewsByApiId.pending, (state) => {
      state.loading = true; 
      state.error = null; 
    });

    builder.addCase(fetchReviewsByApiId.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload; 
    });

    builder.addCase(fetchReviewsByApiId.rejected, (state, action) => {
      state.loading = false; 
      state.error = action.error.message || 'Failed to fetch reviews'; 
    });

    builder.addCase(addReview.fulfilled, (state, action) => {
      state.reviews.push(action.payload); 
    });

    builder.addCase(addReview.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(addReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to add a review';
    });
  },
});


export default ReviewSlice.reducer;

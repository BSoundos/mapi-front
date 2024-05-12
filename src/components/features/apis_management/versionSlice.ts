import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_BASE_URL } from '@/data/constants';

const initialState = {
    draftVersions: [],
    activeVersions: [],
    currentVersion: null,
    isLoading: false,
    isError: false,
    error: null,
  };
  

export const getAllVersions = createAsyncThunk('versions/getAllVersions', async (id) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/get-all-versions-api/${id}`, { headers });
    console.log("response",response.data);
    return response.data;
  } catch (error:Error) {
    throw Error(error.response.data.message || 'Failed to fetch versions');
  }
});

export const getSingleVersion = createAsyncThunk('versions/getSingleVersion', async (id) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/versions/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to fetch version');
  }
});

export const createNewVersion = createAsyncThunk(
  'versions/createNewVersion',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Token ${token}` };
      const response = await axios.post(`${BACKEND_BASE_URL}/apis_management/add-api-version/${id}/`, data, { headers });
      return response.data;
    } catch (error) {
      // Check if the error is an Axios error
      if (axios.isAxiosError(error)) {
        // Extract the error message from the response data
        const errorMessage = error.response?.data?.error || 'Failed to create new version';
        return rejectWithValue(errorMessage);
      } else {
        // If it's not an Axios error, just throw the error
        throw error;
      }
    }
  }
);


export const updateExistingVersion = createAsyncThunk('versions/updateExistingVersion', async ({id, data}) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.put(`${BACKEND_BASE_URL}/apis_management/update-api-version/${id}/`, data, { headers });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to update version');
  }
});



const versionSlice = createSlice({
    name: 'versions',
    initialState,
    reducers:{
      clearVersionError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllVersions.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.error=null;
          state.draftVersions = [];
          state.activeVersions = [];
          state.currentVersion = null;
        })
        .addCase(getAllVersions.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.error=null;
          state.draftVersions = action.payload.filter(version => version.status === 'draft');
          state.activeVersions = action.payload.filter(version => version.status === 'active');
          state.currentVersion = action.payload.find(version => version.status === 'current') || null;
        })
        .addCase(getAllVersions.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload;
          state.draftVersions = [];
          state.activeVersions = [];
          state.currentVersion = null;
        })
        .addCase(updateExistingVersion.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.error=null;
        })
        .addCase(updateExistingVersion.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.error=null;
          const updatedVersionIndex = state.draftVersions.findIndex(
            (version) => version.api_version_id === action.payload.api_version_id
          );
          if (updatedVersionIndex !== -1) {
            // Update the version in the draft versions list
            state.draftVersions[updatedVersionIndex] = action.payload;
          } else {
            const activeVersionIndex = state.activeVersions.findIndex(
              (version) => version.api_version_id === action.payload.api_version_id
            );
            if (activeVersionIndex !== -1) {
              // Update the version in the active versions list
              state.activeVersions[activeVersionIndex] = action.payload;
            } else {
              // Update the current version
              state.currentVersion = action.payload;
            }
        }
        })
        .addCase(updateExistingVersion.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload;
        })
        .addCase(createNewVersion.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.error=null;
        })       
        .addCase(createNewVersion.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.error=null;
            const newVersion = action.payload;
            if (newVersion.status === 'draft') {
              state.draftVersions.push(newVersion);
            } else if (newVersion.status === 'active') {
              state.activeVersions.push(newVersion);
            } else if (newVersion.status === 'current') {
              state.currentVersion = newVersion;
            }
          })
        .addCase(createNewVersion.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload || 'Failed to create new version';
        });
    },
  });
  
  export const { clearVersionError } = versionSlice.actions;
  export default versionSlice.reducer;
  

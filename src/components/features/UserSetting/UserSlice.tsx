import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { log } from 'console';
import {User} from '@/types/user';

const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;


interface UserSettingsState {
  basicInformation: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; 
}

const initialState: UserSettingsState = {
  basicInformation: {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
  },
  status: 'idle', 
};

interface BasicInformation {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  contact_info: string;
}


interface Settings {
  oldUsername: string;
  userData: BasicInformation;
}

interface BasicInformationSecurity {
  old_password:String
  new_password:String
}

interface SettingsSecurity {
  userSecurityData: BasicInformationSecurity;
}



export const UpdateUserSecurity = createAsyncThunk<BasicInformationSecurity, SettingsSecurity>(
  'UpdateUserSecurity/update',
  async ({  userSecurityData }, { rejectWithValue }) => {
    try {
    
      const response = await axios.post(`${backendBaseUrl}/profile_management/update-user-password/`, userSecurityData);
      return response.data;
    }  catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);


export const updateUserSettings = createAsyncThunk<BasicInformation, Settings>(
  'userSettings/update',
  async ({ oldUsername, userData }, { rejectWithValue }) => {
    try {
    
      const response = await axios.patch(`${backendBaseUrl}/profile_management/update-user/${oldUsername}/`, userData);
      return response.data;
    }  catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const GetInformationUser = async (username: string): Promise<User> => {
  try {
    const response = await axios.get(`${backendBaseUrl}/profile_management/userInfo/${username}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetInformationProvider = async (username: string): Promise<User> => {
  try {
    
    const response = await axios.get(`${backendBaseUrl}/profile_management/providerInfo/${username}/`);
    
    return response.data;
  } catch (error) {
    
    throw error;
  }
};


export const updateProviderSettings = createAsyncThunk<BasicInformation, Settings>(
  'userSettings/update',
  async ({ oldUsername, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${backendBaseUrl}/profile_management/update-provider/${oldUsername}/`, userData);
      return response.data;
    }  catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const UpdateProviderSecurity = createAsyncThunk<BasicInformationSecurity, SettingsSecurity>(
  'UpdateUserSecurity/update',
  async ({  userSecurityData }, { rejectWithValue }) => {
    try {
    
      const response = await axios.post(`${backendBaseUrl}/profile_management/update-user-provider/`, userSecurityData);
      return response.data;
    }  catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState, 
  reducers: {
    setBasicInformation(state, action) {
      state.basicInformation = action.payload;
    },
  },
  extraReducers: (builder) => { 
    builder
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updateUserSettings.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const { setBasicInformation } = userSettingsSlice.actions;

export default userSettingsSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';
const initialState = {
  privatePlans: [],
  privatePlan: {},
  invitation:{},
  users:[],
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
  export const searchUsers = createAsyncThunk<User[], string>(
    'privatePlan/searchUsers',
    async (searchQuery: string): Promise<User[]> => {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.get(`${BACKEND_BASE_URL}/apis_management/search-users/?q=${searchQuery}`, { headers });
      const data = response.data;
  
      const mappedData: User[] = data.map((user: any) => ({
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name:user.last_name
      }));
  
      return mappedData;
    }
  );

  export const inviteUser = createAsyncThunk<
  { message: string },
  { id: number; data: { selected_user_id: number } },
  { rejectValue: string }
>('privatePlan/inviteUser', async ({ id, data }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(
      `${BACKEND_BASE_URL}/apis_management/invite-user-to-plan/${id}/`,
      data,
      { headers }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error || 'Failed to invite user to this plan';
      return rejectWithValue(errorMessage);
    } else {
      throw error;
    }
  }
});

  
 
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


  export const getPlanUsers = createAsyncThunk<
  { rejectValue: string }
>('privatePlan/getPlanUsers', async (id, {rejectWithValue}) => {
  try {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Token ${token}` };
    const response = await axios.get(
      `${BACKEND_BASE_URL}/apis_management/get-users-by-plan/${id}/`,
      { headers }
    );
    return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.error || 'Failed to get users plan';
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

  export const blockUserInvitation = createAsyncThunk<
    { rejectValue: string }
  >('privatePlan/blockUserInvitation', async ({ idPlan,idUser }, {rejectWithValue}) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Token ${token}` };
      const response = await axios.put(
        `${BACKEND_BASE_URL}/apis_management/block-invitation-user-plan/${idPlan}/${idUser}/`,
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
  export const unBlockUserInvitation = createAsyncThunk<
    { rejectValue: string }
  >('privatePlan/unBlockUserInvitation', async ({ idPlan,idUser }, {rejectWithValue}) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Token ${token}` };
      const response = await axios.put(
        `${BACKEND_BASE_URL}/apis_management/unblock-invitation-user-plan/${idPlan}/${idUser}/`,
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

  export const deleteUserFromPlan = createAsyncThunk<
  { rejectValue: string }
>('privatePlan/deleteUserFromPlan', async ({ idPlan,idUser }, {rejectWithValue}) => {
  try {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Token ${token}` };
    const response = await axios.delete(
      `${BACKEND_BASE_URL}/apis_management/remove-user-from-user-plan/${idPlan}/${idUser}/`,
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



// Define the async thunk for accepting invitation user plan
export const acceptInvitationUserPlan = createAsyncThunk(
  'userPlans/acceptInvitationUserPlan',
  async (userPlanId : number, thunkAPI) => {
    try {
      // Make a request to accept the invitation user plan
      const response = await axios.put(`${BACKEND_BASE_URL}/apis_management/accept-invitation/${userPlanId}/`);

      // Return the data from the response
      return response.data;
    } catch (error) {
      // Return any error that occurs
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const privatePlanSlice = createSlice({
  name: 'privatePlan',
  initialState,
  reducers: {
    clearPlanError: (state) => {
      state.error = null;
    },
  },
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
        state.error = action.error;
      })
      .addCase(getPlanUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlanUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(getPlanUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(inviteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(inviteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users.push(action.payload);
      })
      .addCase(inviteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.error = action.error;
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
      .addCase(unBlockUserInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unBlockUserInvitation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { idPlan, idUser } = action.meta.arg;
        const userIndex = state.users.findIndex(user => user.user === idUser && user.user_plan === idPlan);
        if (userIndex !== -1) {
          const user = state.users[userIndex];
          if (user.recieved) {
            user.status = "confirmed";
          } else {
            user.status = "waiting";
          }
        }
      })
      .addCase(unBlockUserInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(blockUserInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockUserInvitation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { idPlan, idUser } = action.meta.arg;
        const userIndex = state.users.findIndex(user => user.user === idUser && user.user_plan === idPlan);
        if (userIndex !== -1) {
          state.users[userIndex].status = "blocked"; 
        }
      })
      .addCase(blockUserInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserFromPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserFromPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { idPlan, idUser } = action.meta.arg;
        state.users = state.users.filter(user => !(user.user === idUser && user.user_plan === idPlan));
      })
      .addCase(deleteUserFromPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(acceptInvitationUserPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptInvitationUserPlan.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(acceptInvitationUserPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  },
});
  
export const { clearPlanError } = privatePlanSlice.actions;
export default privatePlanSlice.reducer;

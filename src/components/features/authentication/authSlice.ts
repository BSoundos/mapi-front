import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.user = action.payload;
            state.error = null;
        },
        loginFailure(state, action) {
            state.user = null;
            state.error = action.payload;
        },
        registerSuccess(state) {
            state.error = null;
        },
        registerFailure(state, action) {
            state.error = action.payload;
        },
        verifySuccess(state) {
            state.error = null;
        },
        verifyFailure(state, action) {
            state.error = action.payload;
        },
        logoutSuccess(state) {
            state.user = null;
            state.error = null;
        },
        logoutFailure(state, action) {
            state.error = action.payload;
        },
    },
});

export const {
    loginSuccess,
    loginFailure,
    registerSuccess,
    registerFailure,
    verifySuccess,
    verifyFailure,
    logoutSuccess,
    logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;
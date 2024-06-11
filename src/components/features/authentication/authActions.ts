import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';
import { loginSuccess, loginFailure, registerSuccess, registerFailure, verifySuccess, verifyFailure, logoutSuccess, logoutFailure } from './authSlice';
import { LoginCredentails, LoginDispatchFunction, LogoutDispatchFunction, RegisterDispatchFunction, VerifyDispatchFunction } from '@/types/auth';


export const login = (credentials: LoginCredentails, api: string, plan: string) => async (dispatch: LoginDispatchFunction) => {
    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/authentication/login/`, credentials);
        dispatch(loginSuccess(response.data));
        const { token, id, username, email, first_name, last_name, role } = response.data;
        // save user infos to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', id);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('first_name', first_name);
        localStorage.setItem('last_name', last_name);
        localStorage.setItem('role', role);
        // redirect to the HomePage
        if (role === "user" && api && plan) {
            window.location.href = `/api/confirm/${api}/${plan}`;
        }
        else if(role==="user"){
            window.location.href = '/';}
        else if(role==="provider"){
            window.location.href = '/dashboard-provider';
        }
        else{
            window.location.href = '/admin/dashboard';
        }
        return response.data;
    } catch (error) {
        dispatch(loginFailure(error.response.data));
        console.error('Error logging in user:', error.response.data);
        return error.response.data;
    }
};

export const register = (credentials) => async (dispatch: RegisterDispatchFunction) => {
    try {
        await axios.post(`${BACKEND_BASE_URL}/authentication/register/`, credentials);
        dispatch(registerSuccess());
        window.location.href = '/verify/' + credentials.username;
        localStorage.setItem('verificationNeeded', 'true');
    } catch (error) {
        dispatch(registerFailure(error.response.data));
        console.error('Error registering user:', error.response.data);
        return error.response.data;
    }
};

export const verify = (credentials) => async (dispatch: VerifyDispatchFunction) => {
    try {
       const response= await axios.post(`${BACKEND_BASE_URL}/authentication/verify/`, credentials);
        dispatch(verifySuccess());
        return response.data
    } catch (error) {
        dispatch(verifyFailure(error.response.data));
        return error.response.data;
    }
};

export const logout = () => async (dispatch: LogoutDispatchFunction) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Token ${token}`,
          };
        await axios.post(`${BACKEND_BASE_URL}/authentication/logout/`,{ headers });
        dispatch(logoutSuccess());
        localStorage.clear();
        window.location.href = '/';
    } catch (error) {
        dispatch(logoutFailure(error.response.data));
        console.error('Error logging out user:', error.response.data);
    }
};


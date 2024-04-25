import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';



export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/authentication/login/`, credentials);
      const { token, id, username, email, first_name, last_name, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', id);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('first_name', first_name);
      localStorage.setItem('last_name', last_name);
      localStorage.setItem('role', role);
      dispatch({ type: 'LOGIN_SUCCESS' }); // Dispatch success action
      window.location.href = '/';
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data }); // Dispatch failure action
      console.error('Error logging in user:', error.response.data);
      return error.response.data;
    }
  };
};

export const register = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/authentication/register/`, credentials);

      dispatch({ type: 'REGISTER_SUCCESS' }); // Dispatch success action
      window.location.href = '/verify/' + credentials.username;
      localStorage.setItem('verificationNeeded', 'true');


    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data }); // Dispatch failure action
      console.error('Error registering user:', error.response.data);
      return error.response.data;
    }
  };
};

export const verify = (credentials) => {
  return async (dispatch) => {
    try {
      console.log(credentials);
      const response = await axios.post(`${BACKEND_BASE_URL}/authentication/verify/`, credentials);

      dispatch({ type: 'VERIFY_SUCCESS' }); // Dispatch success action
      localStorage.removeItem('verificationNeeded');
      return response.data;

    } catch (error) {
      dispatch({ type: 'VERIFY_FAILURE', payload: error.response.data }); // Dispatch failure action
      return error.response.data;
    }
  };
};


export const logout = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/authentication/logout/`);

      dispatch({ type: 'LOGOUT_SUCCESS' }); // Dispatch success action
      window.location.href = '/';

    } catch (error) {
      dispatch({ type: 'LOGOUT_FAILURE', payload: error.response.data }); // Dispatch failure action
      console.error('Error logging out user:', error.response.data);
    }
  };
};


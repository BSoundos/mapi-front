import axios from 'axios';

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/authentication/login/', credentials); 
      console.log('response', response.data);
      const { token } = response.data;
      localStorage.setItem('token', token);
      dispatch({ type: 'LOGIN_SUCCESS' }); // Dispatch success action
      console.log('returned token', token);
      window.location.href = '/test';
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data }); // Dispatch failure action
    }
  };
};

export const register = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/authentication/register/', credentials); 
      
      dispatch({ type: 'REGISTER_SUCCESS' }); // Dispatch success action
      window.location.href = '/verify/'+credentials.username;
      
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data }); // Dispatch failure action
      console.error('Error registering user:', error.response.data);
    }
  };
};

export const verify = (credentials) => {
  return async (dispatch) => {
    try {
      console.log(credentials);
      const response = await axios.post('http://127.0.0.1:8000/authentication/verify/', credentials); 
      
      dispatch({ type: 'VERIFY_SUCCESS' }); // Dispatch success action
      window.location.href = '/login';
      
    } catch (error) {
      dispatch({ type: 'VERIFY_FAILURE', payload: error.response.data }); // Dispatch failure action
      console.error('Error verifying user:', error.response.data);
    }
  };
};
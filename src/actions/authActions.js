// actions/authActions.js

import { login } from '../services/auth';



export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const isAuthenticated = await login(email, password);

      if (isAuthenticated) {
        dispatch({ type: 'LOGIN_SUCCESS' });
        console.log('User successfully logged in. Dispatched LOGIN_SUCCESS.');
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid email or password.' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      dispatch({ type: 'LOGIN_FAILURE', payload: 'An unexpected error occurred.' });
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    // Perform logout logic if needed
    dispatch({ type: 'LOGOUT' });
  };
};


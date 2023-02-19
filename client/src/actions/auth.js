import setAuthToken from '../utils/setAuthToken';
import {
  LOGIN_SUCCESS,
  LOGOUT
} from './types';

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };
  setAuthToken(body);
  dispatch({
    type: LOGIN_SUCCESS,
    payload: body
  });
};

// Logout
export const logout = () => ({ type: LOGOUT });

// API
import Api from '../api';

// utils
import { getToken } from '../utils';

// actions
import { toggleDialog, ALERT_DIALOG } from './dialogs';

// action types
export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const setUser = payload => ({
  type: SET_USER,
  payload
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

export const registerLoginUser = (user, isRegister) => async dispatch => {
  const { data, error } = isRegister
    ? await new Api().registerLoginUser(user, 'register')
    : await new Api().registerLoginUser(user, 'login');

  if (error) {
    dispatch(toggleDialog(ALERT_DIALOG, true, error));
    return null;
  }

  const { userName, token } = data;

  document.cookie = `token=${token}; path=/; expires=${new Date(
    new Date().getTime() + 60 * 60 * 1000
  ).toUTCString()}`;

  dispatch(setUser({ userName, token }));
};

export const fetchUser = () => async dispatch => {
  const token = getToken();
  const { data } = await new Api({ token }).fetchUser();
  const { userName } = data;

  dispatch(setUser({ userName, token }));
};

export const logout = () => dispatch => {
  document.cookie = `token=`;

  dispatch(logoutUser());
};

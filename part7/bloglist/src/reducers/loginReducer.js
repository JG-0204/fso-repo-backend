import { createSlice } from '@reduxjs/toolkit';

import loginService from '../services/login';

import { showNotification } from './notificationReducer';

import { setToken, saveToLocalStorage, loadFromLocalStorage } from '../util';

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    saveUser: (state, action) => action.payload,
    removeUser: (state, action) => null,
  },
});

export const { saveUser, removeUser } = loginSlice.actions;

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password });
      setToken(user.token);
      saveToLocalStorage('loggedInUser', user);
      dispatch(saveUser(user));
    } catch (e) {
      dispatch(
        showNotification('Wrong username or password! Enter a proper account.')
      );
    }
  };
};

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.clear();
    dispatch(removeUser());
  };
};

export const loginIfUserExist = () => {
  return dispatch => {
    const loggedInUser = loadFromLocalStorage('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setToken(user.token);
      dispatch(saveUser(user));
    }
  };
};

export default loginSlice.reducer;

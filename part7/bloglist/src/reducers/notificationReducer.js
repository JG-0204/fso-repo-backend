import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (state, action) => action.payload,
    removeNotification: (state, action) => '',
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export const showNotification = message => {
  return dispatch => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 4000);
  };
};

export default notificationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showMessage(state, action) {
      const message = action.payload;
      return message;
    },
  },
});

let timeoutId;

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(showMessage(message));

    if (timeoutId) {
      console.log('clearing timeout', timeoutId);
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch(showMessage(''));
    }, seconds * 1000);
    console.log('setting new timeout', timeoutId);
  };
};

export const { showMessage, removeMessage } = notificationSlice.actions;

export default notificationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showMessage(state, action) {
      const message = action.payload;
      return message;
    },
    removeMessage(state, action) {
      return action.payload;
    },
  },
});

export const { showMessage, removeMessage } = notificationSlice.actions;
export default notificationSlice.reducer;

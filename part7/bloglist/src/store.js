import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';

export const store = configureStore({
  reducer: {
    notif: notificationReducer,
    blogs: blogsReducer,
  },
});

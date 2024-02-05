import { createContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return `Anecdote: "${action.payload.toUpperCase()}" added.`;
    case 'VOTE':
      return `You voted for "${action.payload.toUpperCase()}".`;
    case 'REMOVE':
      return action.payload;
    case 'ERROR':
      return 'Anecdotes must have 5 or more length';
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    '',
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

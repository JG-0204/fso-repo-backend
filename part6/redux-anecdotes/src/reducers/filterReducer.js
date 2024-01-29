const filterReducer = (state = '', action) => {
  console.log('searching for...', action.payload);

  if (action.type === 'SEARCH') {
    return action.payload;
  }

  return state;
};

export const search = (text) => {
  return {
    type: 'SEARCH',
    payload: text,
  };
};

export default filterReducer;

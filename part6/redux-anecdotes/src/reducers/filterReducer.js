import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterByText(state, action) {
      return action.payload;
    },
  },
});

export const { filterByText } = filterSlice.actions;

export default filterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return state.concat(action.payload);
    },
    voteAnecdote(state, action) {
      const anecdote = state.find((a) => a.id === action.payload);
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };

      return state.map((anecdote) =>
        anecdote.id !== action.payload ? anecdote : changedAnecdote,
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;

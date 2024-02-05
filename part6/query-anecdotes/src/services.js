import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export const createNew = async (newAnecdote) => {
  const res = await axios.post(baseUrl, newAnecdote);
  return res.data;
};

export const update = async (updatedAnecdote) => {
  const path = `${baseUrl}/${updatedAnecdote.id}`;

  const res = await axios.put(path, updatedAnecdote);
  return res.data;
};

import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const obj = { content, votes: 0 };
  const res = await axios.post(baseUrl, obj);
  return res.data;
};

const update = async (obj) => {
  const url = `${baseUrl}/${obj.id}`;
  const res = await axios.put(url, obj);
  return res.data;
};

export default { getAll, create, update };

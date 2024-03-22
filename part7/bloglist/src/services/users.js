import axios from 'axios';
const url = '/api/users';

const getUsers = async () => {
  const response = await axios.get(url);
  return response.data;
};

const getUserById = async id => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
};

export default { getUsers, getUserById };

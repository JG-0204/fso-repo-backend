import axios from 'axios';
import { NewDiary } from '../App';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const createNewDiary = async (newDiary: NewDiary) => {
  const response = await axios.post(baseUrl, newDiary);

  return response.data;
};

export default { getAll, createNewDiary };

import axios from 'axios';
import { NewDiary } from '../App';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const createNewDiary = async (newDiary: NewDiary) => {
  try {
    const response = await axios.post(baseUrl, newDiary);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorObject = error.response?.data.error[0];
      const errorMessage = `Incorrect ${errorObject.path[0]}: ${errorObject.received}.`;
      throw new Error(errorMessage);
    }
  }
};

export default { getAll, createNewDiary };

import { useEffect, useState } from 'react';
import diaryService from './services/diary';

import Diaries from './components/Diaries';
import FlightDiaryForm from './components/FlightDiaryForm';

export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type NewDiary = Omit<Diary, 'id'>;

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const initialDiaries = await diaryService.getAll();

      setDiaries(initialDiaries);
    };

    fetchDiaries();
  }, []);

  return (
    <div>
      <h1>Illari's flight diaries</h1>
      <FlightDiaryForm />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;

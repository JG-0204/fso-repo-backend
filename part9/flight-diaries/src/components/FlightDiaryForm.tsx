import { useState } from 'react';
import { NewDiary, Diary } from '../App';
import diaryService from '../services/diary';

interface FlightDiaryFormProps {
  add: (args: Diary) => void;
}

const FlightDiaryForm = ({ add }: FlightDiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const [error, setError] = useState('');

  const onAddDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const diaryToAdd: NewDiary = {
        date,
        visibility,
        weather,
        comment,
      };

      const newDiary: Diary = await diaryService.createNewDiary(diaryToAdd);

      add(newDiary);

      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
      setError('');
    } catch (e: unknown) {
      let errorMessage;
      if (e instanceof Error) {
        errorMessage = `Error: ${e.message}`;
        setError(errorMessage);
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form
        onSubmit={onAddDiary}
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '500px',
        }}
      >
        <span style={{ color: 'red' }}>{error && error}</span>
        <label htmlFor="date">
          date:
          <input
            type="date"
            name="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </label>
        <label htmlFor="visibility">
          <span>visibility: </span>
          great
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility('great')}
          />
          good
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility('good')}
          />
          ok
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility('ok')}
          />
          poor
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility('poor')}
          />
        </label>
        <label htmlFor="weather">
          <span>weather: </span>
          sunny
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather('sunny')}
          />
          rainy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather('rainy')}
          />
          cloudy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather('cloudy')}
          />
          stormy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather('stormy')}
          />
          windy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather('windy')}
          />
        </label>
        <label htmlFor="comment">
          comment:
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </label>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default FlightDiaryForm;

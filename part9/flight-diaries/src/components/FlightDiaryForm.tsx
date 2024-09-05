import { useState } from 'react';
import diaryService from '../services/diary';

const FlightDiaryForm = () => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const onAddDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const diaryToAdd = {
      date,
      visibility,
      weather,
      comment,
    };

    diaryService.createNewDiary(diaryToAdd);

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <form
      onSubmit={onAddDiary}
      style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}
    >
      <label htmlFor="date">
        date:
        <input
          type="text"
          name="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </label>
      <label htmlFor="visibility">
        visibility:
        <input
          type="text"
          name="visibility"
          value={visibility}
          onChange={({ target }) => setVisibility(target.value)}
        />
      </label>
      <label htmlFor="weather">
        weather:
        <input
          type="text"
          name="weather"
          value={weather}
          onChange={({ target }) => setWeather(target.value)}
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
      <button type="submit">add</button>
    </form>
  );
};

export default FlightDiaryForm;

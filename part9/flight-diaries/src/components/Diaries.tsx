import { Diary } from '../App';

const Diaries = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      <ul>
        {diaries.map((diary: Diary) => (
          <li key={diary.id}>
            <div>
              <h3>{diary.date}</h3>
              <p>visibility: {diary.visibility}</p>
              <p>weather: {diary.weather}</p>
              {diary.comment ? <p>comment: {diary.comment}</p> : ''}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Diaries;

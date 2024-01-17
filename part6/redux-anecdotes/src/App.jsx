import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) => state);
  console.log(anecdotes);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteAnecdote(id));
  };

  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    console.log('anecdote', anecdote);
    dispatch(createAnecdote(anecdote));
    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;

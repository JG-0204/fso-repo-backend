import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { showMessage, removeMessage } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    console.log('anecdote', anecdote);
    dispatch(createAnecdote(anecdote));
    event.target.anecdote.value = '';

    dispatch(showMessage(`You added ${anecdote}`));
    setTimeout(() => {
      dispatch(removeMessage(null));
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;

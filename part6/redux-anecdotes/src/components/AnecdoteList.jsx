import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { removeMessage, showMessage } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes;
    }

    return anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase()),
    );
  });

  const dispatch = useDispatch();

  console.log(
    'store state',
    useSelector((state) => state),
  );

  const vote = async (id) => {
    const anecdote = anecdotes.find((a) => a.id === id);
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    dispatch(voteAnecdote(changedAnecdote));

    // const currAnecdote = anecdotes.find((a) => a.id === id).content;
    dispatch(showMessage(`You voted for ${anecdote.content}`));
    setTimeout(() => {
      dispatch(removeMessage(null));
    }, 5000);
  };

  const sortByVotes = (arr) => arr.toSorted((a, b) => b.votes - a.votes);

  return (
    <>
      {sortByVotes(anecdotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;

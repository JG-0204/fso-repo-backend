import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

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

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  const sortByVotes = (arr) => arr.sort((a, b) => b.votes - a.votes);

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

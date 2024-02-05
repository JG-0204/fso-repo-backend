import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAll, createNew, update } from './services';
import { useNotificationDispatch } from './hooks';
import { useState } from 'react';

const App = () => {
  const [timeoutId, setTimeoutId] = useState(null);
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const showNotification = (type, payload, seconds) => {
    if (timeoutId) {
      // console.log('clearing timeout', timeoutId);
      clearTimeout(timeoutId);
    }

    dispatch({ type, payload });

    const timeout = setTimeout(() => {
      dispatch({ type: 'REMOVE', payload: '' });
    }, seconds * 1000);

    // console.log('setting new timeout', timeout);
    setTimeoutId(timeout);
  };

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    showNotification('VOTE', anecdote.content, 5);
  };

  const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((a) =>
          a.id !== updatedAnecdote.id ? a : updatedAnecdote,
        ),
      );
    },
  });

  const handleCreate = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const data = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], data.concat(newAnecdote));
    },
    onError: () => {
      showNotification('ERROR', '', 5);
    },
  });

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
  });

  // console.log(JSON.parse(JSON.stringify(result)));

  if (result.isPending) {
    return <span>Loading....</span>;
  }

  if (result.isError) {
    return <span>Error: {result.error.message}</span>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm
        addAnecdoteMutation={handleCreate}
        showNotif={showNotification}
      />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

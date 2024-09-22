import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries';
import { useOutletContext } from 'react-router-dom';

import updateCache from '../util';

const BookForm = () => {
  const { authors } = useOutletContext();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook);
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
    onQueryUpdated: (observableQuery) => {
      const shouldRefetchQuery = !authors
        .map((author) => author.name)
        .includes(author);

      if (shouldRefetchQuery) {
        observableQuery.refetch();
      }
    },
  });

  const addGenre = () => {
    setGenres((genres) => genres.concat(genre));
    setGenre('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const book = {
      title,
      author,
      published: Number(published),
      genres,
    };

    createBook({ variables: { ...book } });

    setTitle('');
    setAuthor('');
    setPublished('');
    setGenres([]);
  };

  return (
    <>
      <form type="submit" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="book-title">
            title
            <input
              type="text"
              id="book-title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="book-author">
            author
            <input
              type="text"
              id="book-author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="book-published">
            published
            <input
              type="number"
              id="book-published"
              value={published}
              onChange={({ target }) => setPublished(Number(target.value))}
            />
          </label>
        </div>
        <div>
          <label htmlFor="book-genre">
            genre
            <input
              type="text"
              id="book-genre"
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
          </label>
          <button type="button" onClick={addGenre}>
            add genre
          </button>
          <p>genres: {genres?.join(' ')}</p>
        </div>
        <button type="submit">create book</button>
      </form>
    </>
  );
};

export default BookForm;

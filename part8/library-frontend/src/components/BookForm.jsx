import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createBook({ variables: { title, author, published, genres } });

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

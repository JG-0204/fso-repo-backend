import { useQuery } from '@apollo/client';
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries';
import { useEffect, useState } from 'react';

const getAllBookGenres = (books) => {
  const arr = [];
  books.map((book) => {
    if (book.genres.length === 0) return;
    if (book.genres.length > 1) {
      book.genres.forEach((genre) => {
        if (!arr.includes(genre)) arr.push(genre);
      });
    } else {
      if (!arr.includes(book.genres)) arr.push(book.genres);
    }
  });

  return arr;
};

const Books = () => {
  const [genre, setGenre] = useState(null);
  const [booksByGenre, setBooksByGenre] = useState(null);
  const { loading, data } = useQuery(ALL_BOOKS);

  if (loading) return <div>loading...</div>;

  const books = !booksByGenre ? data?.allBooks : booksByGenre;
  const bookGenres = getAllBookGenres(data?.allBooks);

  return (
    <div>
      <h2>Books</h2>
      {booksByGenre && (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      )}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <th style={{ textAlign: 'left' }}>{book.title}</th>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BookGenres
        genres={bookGenres}
        setBooks={setBooksByGenre}
        setSelectedGenre={setGenre}
      />
    </div>
  );
};

const BookGenres = ({ genres, setBooks, setSelectedGenre }) => {
  const [genre, setGenre] = useState('');

  const { data } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
  });

  useEffect(() => {
    if (data) {
      setBooks(data?.allBooks);
    }
  }, [setBooks, data]);

  const handleClick = (genre) => {
    console.log('setting genre to ', genre);
    setGenre(genre);
    setSelectedGenre(genre);
  };

  return (
    <div>
      {genres.map((genre, index) => (
        <button
          key={index}
          onClick={({ target }) => handleClick(target.textContent)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;

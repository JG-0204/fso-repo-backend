import { useQuery } from '@apollo/client';
import { BOOKS_BY_GENRE } from '../queries';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const getAllBookGenres = (books) => {
  const arr = [];
  books.map((book) => {
    if (book.genres.length === 0) return;
    if (book.genres.length >= 1) {
      book.genres.forEach((genre) => {
        if (!arr.includes(genre)) arr.push(genre);
      });
    }
  });

  return arr;
};

const Books = () => {
  const [genre, setGenre] = useState(null);
  const [booksByGenre, setBooksByGenre] = useState(null);

  const { books } = useOutletContext();

  if (!books) return <div>loading...</div>;

  const booksArr = !booksByGenre ? books : booksByGenre;
  const bookGenres = getAllBookGenres(books);

  return (
    <div>
      <h2>Books</h2>
      {booksByGenre && (
        <div>
          <p>
            in genre <strong>{genre}</strong>
            <button onClick={() => setBooksByGenre(null)}>remove</button>
          </p>
        </div>
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
          {booksArr.map((book) => (
            <tr key={book.title}>
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
  const [genre, setGenre] = useState(null);

  const { data } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre,
  });

  useEffect(() => {
    if (data) {
      setBooks(data?.allBooks);
    }
  }, [setBooks, data, genre]);

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

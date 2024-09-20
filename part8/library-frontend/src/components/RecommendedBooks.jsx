import { BOOKS_BY_GENRE } from '../queries';
import { useQuery } from '@apollo/client';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RecommendedBooks = () => {
  const { loggedInUser } = useOutletContext();
  const navigate = useNavigate();

  const { data, loading } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: loggedInUser?.favoriteGenre },
  });

  if (!loggedInUser) {
    return (
      <div>
        <p>user is not signed-in</p>
        <button onClick={() => navigate('/login')}>login</button>
      </div>
    );
  }

  if (loading) return <h3>loading...</h3>;

  const books = data.allBooks;

  return (
    <div>
      <h3>recommendations</h3>
      <p>
        books in your favorite genre:
        <strong>{loggedInUser.favoriteGenre}</strong>
      </p>
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
    </div>
  );
};

export default RecommendedBooks;

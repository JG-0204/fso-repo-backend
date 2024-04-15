import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';

const Authors = () => {
  const { loading, data } = useQuery(ALL_AUTHORS);

  if (loading) return <div>loading...</div>;

  const authors = data.allAuthors;

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.name}>
              <th style={{ textAlign: 'left' }}>{author.name}</th>
              <td>{author.born ?? 'none'}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;

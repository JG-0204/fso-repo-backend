import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import Select from 'react-select';

const BirthYearForm = ({ authors }) => {
  const [author, setAuthor] = useState(null);
  const [birthYear, setBirthYear] = useState('');

  const options = authors.map((a) => {
    return { value: a.name, label: a.name };
  });

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name: author.value, setBornTo: birthYear } });

    setAuthor('');
    setBirthYear('');
  };

  return (
    <>
      <h3>Set birthyear</h3>
      <form action="submit" onSubmit={handleSubmit}>
        <div>
          <Select
            defaultValue={author}
            onChange={setAuthor}
            options={options}
          />
        </div>
        <div>
          new birthyear
          <label htmlFor="birthyear">
            <input
              type="number"
              id="birthyear"
              value={birthYear}
              onChange={({ target }) => setBirthYear(Number(target.value))}
            />
          </label>
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  );
};

const Authors = () => {
  const { loading, data } = useQuery(ALL_AUTHORS);

  const { token } = useOutletContext();

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
      {token && <BirthYearForm authors={authors} />}
    </div>
  );
};

export default Authors;

import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Users = () => {
  const users = useLoaderData();

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blog added</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user.id}>
              <th>
                <Link to={`${user.id}`}>{user.username}</Link>
              </th>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

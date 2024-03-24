import { useLoaderData } from 'react-router-dom';
import Navigation from './Navigation';

const User = () => {
  const user = useLoaderData();
  const blogs = user.blogs;

  return (
    <div>
      <Navigation />
      <h1>Blog App</h1>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;

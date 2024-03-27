import { useLoaderData } from 'react-router-dom';
import Navigation from './Navigation';

const User = () => {
  const user = useLoaderData();
  const blogs = user.blogs;

  return (
    <div>
      <h2 className='font-bold text-2xl my-6'>{user.username}</h2>
      <h3 className='text-lg my-3'>Added Blogs:</h3>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;

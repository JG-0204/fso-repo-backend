import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from './reducers/blogsReducer';
import {
  loginUser,
  logoutUser,
  loginIfUserExist,
} from './reducers/loginReducer';

import { sortByLike } from './util';

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.login);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();

  useEffect(() => {
    if (user) {
      dispatch(fetchBlogs());
    }
  }, [user]);

  useEffect(() => {
    dispatch(loginIfUserExist());
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    dispatch(loginUser(username, password));
    setUsername('');
    setPassword('');
  };

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logoutUser());
    showLoginForm();
  };

  const showLoginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            data-cy='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            data-cy='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit' data-cy='login'>
          login
        </button>
      </form>
    );
  };

  const showNewBlogForm = () => {
    return (
      <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
        <BlogForm />
      </Togglable>
    );
  };

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

      {!user && showLoginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {showNewBlogForm()}

          <div>
            {sortByLike(blogs).map(blog => (
              <Blog blog={blog} key={blog.id} currUser={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

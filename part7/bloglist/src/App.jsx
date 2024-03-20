import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from './reducers/blogsReducer';
import { showNotification } from './reducers/notificationReducer';

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(state => state.blogs);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    if (user) {
      dispatch(fetchBlogs());
    }
  }, [user]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const sortByLike = blogs => {
    if (blogs) {
      return blogs.toSorted((a, b) => b.likes - a.likes);
    }
    return blogs;
  };

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      console.log(user);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
    } catch (exception) {
      dispatch(showNotification('Wrong username or password.'));
    }
    setUsername('');
    setPassword('');
  };

  const handleLogout = e => {
    e.preventDefault();
    localStorage.clear();
    setUser(null);
    showLoginForm();
  };

  // const deleteBlog = async blog => {
  //   try {
  //     const confirm = window.confirm(
  //       `Remove ${blog.title} by ${blog.author}?`
  //     );
  //     if (question) {
  //       await blogService.deleteBlog(blog);
  //       setBlogs(await blogService.getAll());
  //       showNotification(`${blog.title} by ${blog.author} has been deleted.`);
  //     }
  //   } catch (exception) {
  //     console.error('error');
  //   }
  // };

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

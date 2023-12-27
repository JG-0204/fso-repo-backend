import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [isShowing, setIsShowing] = useState(false);
  const [message, setMessage] = useState('');

  const [isUpdating, setIsUpdating] = useState(true);

  const blogFormRef = useRef();

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user, isUpdating]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
    } catch (exception) {
      setIsShowing(true);
      setMessage('Wrong username or password');
      setTimeout(() => {
        setIsShowing(false);
        setMessage('');
      }, 4000);
    }
    setUsername('');
    setPassword('');
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setUser(null);
    showLoginForm();
  };

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      await blogService.create(newBlog);
      isUpdating ? setIsUpdating(false) : setIsUpdating(true);
      setIsShowing(true);
      setMessage(`A new blog ${newBlog.title} is added by ${newBlog.author}.`);
      setTimeout(() => {
        setIsShowing(false);
        setMessage('');
      }, 4000);
    } catch (exception) {
      console.log('Error');
    }
  };

  const showLoginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const showNewBlogForm = () => {
    return (
      <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
    );
  };

  return (
    <div>
      <h1>Blogs</h1>

      {isShowing && <Notification message={message} />}

      {!user && showLoginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {showNewBlogForm()}

          <div>
            {blogs.map((blog) => (
              <Blog blog={blog} key={blog.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

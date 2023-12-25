import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [isShowing, setIsShowing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user, blogs]);

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

  const handleNewBlog = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    try {
      blogService.create(newBlog);
      setIsShowing(true);
      setMessage(`A new blog ${title} is added by ${author}.`);
      setTimeout(() => {
        setIsShowing(false);
        setMessage('');
      }, 4000);
      setTitle('');
      setAuthor('');
      setUrl('');
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
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
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
          <h3>Create New</h3>
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

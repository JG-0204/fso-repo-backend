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

  const blogFormRef = useRef();

  useEffect(() => {
    (async () => {
      if (user) {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      const loggedInUser = localStorage.getItem('loggedInUser');

      if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        setUser(user);
        blogService.setToken(user.token);
      }
    })();
  }, []);

  const sortByLike = blogs => blogs.sort((a, b) => b.likes - a.likes);

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
    } catch (exception) {
      showNotification('Wrong username or password.');
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

  const addBlog = async newBlog => {
    try {
      blogFormRef.current.toggleVisibility();
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      setBlogs(await blogService.getAll());
      showNotification(
        `A new blog ${newBlog.title} by ${newBlog.author} has been added.`
      );
    } catch (exception) {
      console.log('Error');
    }
  };

  const likeBlog = async blog => {
    try {
      await blogService.updateBlogLikes(blog);
      setBlogs(await blogService.getAll());
    } catch (exception) {
      console.error('some error');
    }
  };

  const deleteBlog = async blog => {
    try {
      const question = window.confirm(
        `Remove ${blog.title} by ${blog.author}?`
      );
      if (question) {
        await blogService.deleteBlog(blog);
        setBlogs(await blogService.getAll());
        showNotification(`${blog.title} by ${blog.author} has been deleted.`);
      }
    } catch (exception) {
      console.error('error');
    }
  };

  const showNotification = message => {
    setIsShowing(true);
    setMessage(message);
    setTimeout(() => {
      setIsShowing(false);
      setMessage('');
    }, 4000);
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
            {sortByLike(blogs).map(blog => (
              <Blog
                blog={blog}
                key={blog.id}
                likeUpdater={likeBlog}
                deleteBlog={deleteBlog}
                currUser={user.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

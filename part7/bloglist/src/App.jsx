import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from './reducers/blogsReducer';
import { loginIfUserExist } from './reducers/loginReducer';

import BlogsPage from './components/BlogsPage';
import Notification from './components/Notification';
import Navigation from './components/Navigation';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.login);

  useEffect(() => {
    if (user) {
      dispatch(fetchBlogs());
    }
  }, [user]);

  useEffect(() => {
    dispatch(loginIfUserExist());
  }, []);

  return (
    <div>
      {user ? <Navigation /> : ''}
      <Notification />
      <h1>Blog App</h1>
      <BlogsPage />
    </div>
  );
};

export default App;

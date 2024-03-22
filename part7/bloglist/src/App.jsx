import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from './reducers/blogsReducer';
import { loginIfUserExist } from './reducers/loginReducer';

import BlogsPage from './components/BlogsPage';
import Notification from './components/Notification';

import { Outlet } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(state => state.blogs);
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
      <h1>Blogs</h1>
      <Notification />
      <BlogsPage blogs={blogs} user={user} />
      <Outlet />
    </div>
  );
};

export default App;

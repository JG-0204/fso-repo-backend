import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from './reducers/blogsReducer';
import { loginIfUserExist } from './reducers/loginReducer';
import Notification from './components/Notification';
import Navigation from './components/Navigation';

import { Outlet } from 'react-router-dom';

import './App.css';
// revert to latest commit if you can't make it work

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
    <div className='md:container md:mx-auto'>
      <Navigation />
      <Notification />
      <h1 className='text-6xl font-bold my-7 uppercase'>Blog App</h1>
      <Outlet />
    </div>
  );
};

export default App;

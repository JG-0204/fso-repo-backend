import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';

const Navigation = () => {
  const dispatch = useDispatch();
  const currUser = useSelector(state => state.login);

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <ul>
        <li>
          <Link to={'/'}>blogs</Link>
        </li>
        <li>
          <Link to={'/users'}>users</Link>
        </li>
      </ul>
      {currUser && (
        <div>
          <span>{currUser.username} logged in</span>
          <button onClick={handleLogOut}>logout</button>
        </div>
      )}
    </div>
  );
};

export default Navigation;

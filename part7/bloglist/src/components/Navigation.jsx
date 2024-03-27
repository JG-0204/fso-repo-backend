import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currUser = useSelector(state => state.login);

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className='flex justify-between align-center container sm my-5'>
      <ul className='menu menu-vertical md:menu-horizontal  '>
        <li>
          <Link to={'/'} className='uppercase '>
            home
          </Link>
        </li>
        <li>
          <Link to={'/blogs'} className='uppercase'>
            blogs
          </Link>
        </li>
        <li>
          <Link to={'/users'} className='uppercase'>
            users
          </Link>
        </li>
        {!currUser && (
          <li>
            <Link to={'/login'} className='uppercase'>
              login
            </Link>
          </li>
        )}
      </ul>
      {currUser && (
        <div>
          <span className='font-bold'>User: {currUser.name}</span>
          <button
            onClick={handleLogOut}
            className='btn btn-sm uppercase mx-3 btn-warning'>
            logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navigation;

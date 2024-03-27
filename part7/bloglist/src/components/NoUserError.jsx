import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='flex flex-col items-center mt-20'>
      <p className='font-bold text-2xl'>No user logged in</p>
      <Link to={'/login'} className='link text-2xl'>
        Go to login
      </Link>
    </div>
  );
};

export default Error;

import LoginForm from './LoginForm';

const LoggedOutView = () => {
  return (
    <div className='flex flex-col gap-3 justify-center items-center mt-10'>
      <h2 className='font-bold text-2xl uppercase mb-10'>Login</h2>
      <LoginForm />
    </div>
  );
};

export default LoggedOutView;

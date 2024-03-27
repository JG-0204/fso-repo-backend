import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector(state => state.notif);

  return (
    <div className={message && 'alert alert-success'} data-cy='notif'>
      <p className='text-lg'>{message}</p>
    </div>
  );
};

export default Notification;

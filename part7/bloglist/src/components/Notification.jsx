import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector(state => state.notif);

  let style;

  if (message) {
    style = {
      padding: '2rem 0.5rem',
      fontSize: '18px',
      border: '3px solid red',
      textAlign: 'center',
      marginBottom: '1rem',
    };
  } else {
    style = {
      display: 'none',
    };
  }

  return (
    <div style={style} data-cy='notif'>
      {message}
    </div>
  );
};

export default Notification;

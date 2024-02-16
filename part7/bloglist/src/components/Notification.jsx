const Notification = ({ message }) => {
  const style = {
    padding: '2rem 0.5rem',
    fontSize: '18px',
    border: '3px solid red',
    textAlign: 'center',
    marginBottom: '1rem',
  };
  return (
    <div style={style} data-cy='notif'>
      {message}
    </div>
  );
};

export default Notification;

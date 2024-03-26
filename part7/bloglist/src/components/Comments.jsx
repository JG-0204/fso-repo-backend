import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewComment } from '../reducers/blogsReducer';

const Comments = ({ blogId }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addNewComment(comment, blogId));
    setComment('');
  };

  return (
    <form action='submit' onSubmit={handleSubmit}>
      <input
        type='text'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        id='comment'
        placeholder='add comment'
      />
      <button type='submit'>Post</button>
    </form>
  );
};

export default Comments;

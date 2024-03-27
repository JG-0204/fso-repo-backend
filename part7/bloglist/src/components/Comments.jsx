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
    <form
      action='submit'
      onSubmit={handleSubmit}
      className='flex gap-3 items-center mb-6'>
      <input
        className='input input-md input-primary w-7/12'
        type='text'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        id='comment'
        placeholder='Add new comment'
      />
      <button type='submit' className='btn btn-md btn-neutral uppercase'>
        Post
      </button>
    </form>
  );
};

export default Comments;

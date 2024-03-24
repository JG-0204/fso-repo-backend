import { useSelector } from 'react-redux';
import LoggedInView from './LoggedInView';
import LoggedOutView from './LoggedOutView';

const BlogsPage = () => {
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.login);

  return <div>{user ? <LoggedInView blogs={blogs} /> : <LoggedOutView />}</div>;
};

export default BlogsPage;

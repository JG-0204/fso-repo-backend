import { useSelector } from 'react-redux';
import LoggedInView from './LoggedInView';
import Error from './Error';

const BlogsPage = () => {
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.login);

  if (!user) {
    return <Error />;
  }

  return <LoggedInView blogs={blogs} />;
};

export default BlogsPage;

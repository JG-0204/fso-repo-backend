import LoggedInView from './LoggedInView';
import LoggedOutView from './LoggedOutView';
import Notification from '../components/Notification';

const BlogsPage = ({ blogs, user }) => {
  return (
    <>{user ? <LoggedInView blogs={blogs} user={user} /> : <LoggedOutView />}</>
  );
};

export default BlogsPage;

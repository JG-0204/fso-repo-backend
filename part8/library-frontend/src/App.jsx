import { Outlet, Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <div>
        <button>
          <Link to="authors">authors</Link>
        </button>
        <button>
          <Link to="books">books</Link>
        </button>
        <button>
          <Link to="create">add book</Link>
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default App;

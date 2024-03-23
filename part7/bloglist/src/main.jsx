import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

import { store } from './store';
import { Provider } from 'react-redux';

import Router from './components/Router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </StrictMode>
);

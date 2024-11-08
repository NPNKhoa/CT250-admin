import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from '@emotion/react';
import theme from './configs/theme/theme.js';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { LoadingPage } from './pages/index.js';

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>,
);

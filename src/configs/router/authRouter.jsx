import { v4 as uuidv4 } from 'uuid';
import { HomePage } from '../../pages';
import LoginPage from '../../pages/LoginPage';

export default [
  {
    id: uuidv4(),
    path: '/login',
    element: <LoginPage />,
  },
  {
    id: uuidv4(),
    path: '/forgot-password',
    element: <HomePage />,
  },
];

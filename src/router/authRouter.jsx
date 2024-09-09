import { v4 as uuidv4 } from 'uuid';
import { HomePage } from '../pages';

export default [
  {
    id: uuidv4(),
    path: '/login',
    element: <HomePage />,
  },
  {
    id: uuidv4(),
    path: '/forgot-password',
    element: <HomePage />,
  },
];

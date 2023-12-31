import { createBrowserRouter } from 'react-router-dom';
import About from './About';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import Layout from './Layout';
import LoginPage from './LoginPage';
import PrivateRoutes from './PrivateRoutes';
import UserDetail from './UserDetail';
import UsersPage from './UsersPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: 'about', element: <About /> },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [{ path: 'users', element: <UsersPage />, children: [{ path: ':id', element: <UserDetail /> }] }],
  },
]);

export default router;

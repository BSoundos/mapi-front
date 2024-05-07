import { Outlet, Navigate } from 'react-router-dom';

const ProviderRoutes = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return token && role === 'provider' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProviderRoutes;

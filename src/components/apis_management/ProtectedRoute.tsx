import { Navigate, useLocation, useParams } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  const location = useLocation();
  const { id, plan } = useParams();

  if (!isAuthenticated) {
    // Construct the redirect URL with the api and plan parameters from the URL
    const redirectUrl = `/login/${id}/${plan}`;
    
    // Redirect to the login page with the constructed URL and pass the current location state
    return <Navigate to={redirectUrl} state={{ from: location }} replace />;
  }

  // Render the protected component if the user is authenticated and authorized
  return children;
};

export default ProtectedRoute;

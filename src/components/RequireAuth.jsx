import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

// RequireAuth to Protect the routes if user don't have the Authorization or
// Authentication
const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.username ? (
        <Outlet />
    ) : (
        <Navigate to={'/login'} state={{ from: location }} replace />
    );
};

export default RequireAuth;

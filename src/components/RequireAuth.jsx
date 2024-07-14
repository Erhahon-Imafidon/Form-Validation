import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import PropTypes from 'prop-types';

// RequireAuth to Protect the routes if user don't have the Authorization or
// Authentication
const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const { auth } = useAuth();

    return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
        // User is Authorized
        <Outlet />
    ) : auth?.username ? (
        // User is Authenticated but not Authorized with the required role
        <Navigate to={'/unauthorized'} state={{ from: location }} replace />
    ) : (
        // User not Authenticated
        <Navigate to={'/login'} state={{ from: location }} replace />
    );
};

RequireAuth.propTypes = {
    allowedRoles: PropTypes.array,
};

export default RequireAuth;

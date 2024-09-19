import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persistence, setPersistence] = useState(
        localStorage.getItem('persistence') || false
    );

    return (
        <AuthContext.Provider
            value={{ auth, setAuth, persistence, setPersistence }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthContext;

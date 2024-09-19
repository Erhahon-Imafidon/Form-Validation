import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import useRefreshToken from '../hooks/useRefreshToken.js';

const PersistenceLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth, persistence } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [isLoading]);

    return (
        <>
            {!persistence ? (
                <Outlet />
            ) : isLoading ? (
                <div>Loading...</div>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default PersistenceLogin;

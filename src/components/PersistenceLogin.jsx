import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import useRefreshToken from '../hooks/useRefreshToken.js';

const PersistenceLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth, persistence } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                isMounted && setIsLoading(false);
            }
        };
        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => (isMounted = false);
    }, []);

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

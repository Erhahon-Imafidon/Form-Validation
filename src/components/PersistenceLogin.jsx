import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import useRefreshToken from '../hooks/useRefreshToken.js';
import useToggle from '../hooks/useToggle.js';

const PersistenceLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuth();
    const refresh = useRefreshToken();
    const [persistence] = useToggle('persistence', false);

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

import useAuth from './useAuth.js';
import axios from '../api/axios.js';

const useLogout = () => {
    const { setAuth } = useAuth();

    return async () => {
        setAuth({});
        try {
            const response = await axios('/logout', {
                withCredentials: true,
            });
            await response;
        } catch (error) {
            console.error(error);
        }
    };
};

export default useLogout;

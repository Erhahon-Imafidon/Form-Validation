import axios from '../api/axios.js';
import useAuth from './useAuth.js';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    return async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true,
        });

        setAuth((prev) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken };
        });

        return response.data.accessToken; // Returns the new accessToken
    };
};

export default useRefreshToken;

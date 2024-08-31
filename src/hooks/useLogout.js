import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth.js';

const useLogout = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    return () => {
        setAuth({});
        navigate('/linkpage');
    };
};

export default useLogout;

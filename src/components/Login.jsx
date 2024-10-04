import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import Axios from '../api/axios.js';
import useLocalStorage from '../hooks/useLocalStorage.js';
import useToggle from '../hooks/useToggle.js';

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const [username, setUsername] = useLocalStorage('user', ''); //useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [check, toggleCheck] = useToggle('persistence', false);

    // Effect to focus on the Username input on page load
    useEffect(() => {
        userRef.current?.focus();
    }, []);

    // Effect to clear out the error message when the user responds to the error
    useEffect(() => {
        setErrMsg('');
    }, [username, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await Axios.post(
                LOGIN_URL,
                JSON.stringify({
                    user: username,
                    pwd,
                }),
                {
                    headers: { 'content-type': 'application/json' },
                    withCredentials: true,
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            // set the values to the global state
            setAuth({ username, pwd, accessToken, roles });

            // Clears the input fields
            setUsername('');
            setPwd('');
            navigate(from, { replace: true });
            setIsLoading(false);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing username or password');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current?.focus();
            setIsLoading(false);
        }
    };
    
    return (
        <section>
            <p
                ref={errRef}
                className={errMsg ? 'errorMsg' : 'offScreen'}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    required
                    ref={userRef}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="pwd">Password:</label>
                <input
                    id="pwd"
                    type="password"
                    required
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                />
                <button
                    type="submit"
                    className="mt-8 bg-white"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Sign In'}
                </button>
                <div className="mt-6 relative">
                    <input
                        id="persist"
                        type="checkbox"
                        onChange={toggleCheck}
                        checked={check}
                        className="h-5 w-5 mr-2 cursor-pointer"
                    />
                    <label
                        className="absolute top-[-24px] cursor-pointer"
                        htmlFor="persist"
                    >
                        Trust This Device
                    </label>
                </div>
            </form>
            <p>
                Need an Account? <br />
                <span className="inline underline">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>
    );
};

export default Login;

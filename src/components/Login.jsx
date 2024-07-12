import { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import Axios from '../api/axios.js';

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
                { headers: { 'content-type': 'application/json' } },
                {
                    withCredentials: true,
                }
            );
            // console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            // set the values to the global state
            setAuth({ username, pwd, accessToken, roles });
            // Clears the input fields
            setUsername('');
            setPwd('');
            setSuccess(true);
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
        <>
            {success ? (
                <section>
                    <h1>Hi you are logged in!</h1>
                    <br />
                    <p>
                        <a href="http://localhost:3000/">Go to homepage</a>
                    </p>
                </section>
            ) : (
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
                    </form>
                    <p>
                        Need an Account? <br />
                        <span className="inline underline">
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default Login;

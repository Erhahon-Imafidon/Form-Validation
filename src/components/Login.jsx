import { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../context/AuthProvider.js';

const Login = () => {
    const { sethAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

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
        console.log('password: ' + pwd, 'username: ' + username);
        setSuccess(true);
        setPwd('');
        setUsername('');
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>Hi you are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to homepage</a>
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
                        <button type="submit" className="mt-8 bg-white">
                            Sign In
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

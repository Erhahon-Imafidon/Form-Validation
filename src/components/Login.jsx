import { useEffect, useRef, useState } from 'react';

const Login = () => {
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

import { useEffect, useRef, useState } from 'react';

const Login = () => {
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

    // Effect to clear out the error message when the user reponds to the error
    useEffect(() => {
        setErrMsg('');
    }, [username, pwd]);

    return (
        <div>
            <section>
                <p
                    ref={errRef}
                    className={errMsg ? 'errorMsg' : 'offScreen'}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <h1>Sign In</h1>
            </section>
        </div>
    );
};

export default Login;

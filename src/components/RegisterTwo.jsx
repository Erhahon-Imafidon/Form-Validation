// eslint-disable-next-line no-unused-vars
import { useEffect, useRef, useState } from 'react';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RegisterTwo = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [userName, setUserName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [confirmPwd, setConfirmPwd] = useState('');
    const [validConfirmPwd, setValidConfirmPwd] = useState(false);
    const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // UseEffect to focus the on the username input on page load
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // UseEffect for testing if the username is valid
    useEffect(() => {
        const result = USER_REGEX.test(userName);
        console.log(result);
        setUserName(result);
    }, [userName]);

    // UseEffect for testing password and confirm password
    useEffect(() => {
        const result = PWD_REGEX.test(userName);
        console.log(result);
        setValidPwd(result);
        const match = pwd === confirmPwd;
        console.log(match);
        setValidConfirmPwd(match);
    }, [pwd, confirmPwd]);

    return (
        <>
            {success ? (
                <section>
                    <h1>You have been Successfully Registered!</h1>
                    <p>
                        <a href="#">Log In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p
                        ref={errRef}
                        className={errorMsg ? 'errorMsg' : 'offScreen'}
                        aria-live={'assertive'}
                    >
                        {errorMsg}
                    </p>
                </section>
            )}
        </>
    );
};

export default RegisterTwo;

// eslint-disable-next-line no-unused-vars
import { useEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { FaEye, FaEyeSlash, FaInfoCircle, FaTimes } from 'react-icons/fa';
import Axios from '../api/axios.js';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    // State for Username
    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    // State for Password
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    // state for Confirm Password
    const [confirmPwd, setConfirmPwd] = useState('');
    const [validConfirmPwd, setValidConfirmPwd] = useState(false);
    const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

    // state for Error Message and Success
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // State For Showing Password
    const [showPwd, setShowPwd] = useState(false);

    // An Effect to set the focus to the username input on page load
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // Effect to check if the username is valid
    useEffect(() => {
        const result = USER_REGEX.test(username);
        console.log(result);
        setValidName(result);
    }, [username]);

    // Effect to check if the password is valid
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        setValidPwd(result);
        const match = pwd === confirmPwd;
        setValidConfirmPwd(match);
    }, [pwd, confirmPwd]);

    // Effect to check if there's Error the error message should display based
    // on the change of state
    useEffect(() => {
        setErrorMsg('');
    }, [pwd, confirmPwd, username]);

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrorMsg('Invalid Entry');
            return;
        }
        try {
            const response = await Axios.post(
                '/register',
                JSON.stringify({
                    user: username,
                    pwd,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true);
            setUsername('');
            setPwd('');
            setConfirmPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrorMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrorMsg('Username is Taken');
            } else {
                setErrorMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    };
    return (
        <>
            {success ? (
                <section>
                    <h1>Registered Successfully</h1>
                    <p>
                        <a href="#">Log In</a>
                    </p>
                </section>
            ) : (
                <section onSubmit={handleSubmit}>
                    <p
                        ref={errRef}
                        className={errorMsg ? 'errorMsg' : 'offScreen'}
                        aria-live="assertive"
                    >
                        {errorMsg}
                    </p>
                    <h1>Register</h1>
                    <form>
                        <label htmlFor="username">
                            <p>
                                Username:
                                <span
                                    className={
                                        validName
                                            ? 'text-lime-500 ml-2 inline-block mb-[-3px]'
                                            : 'hidden'
                                    }
                                >
                                    <FaCheck />
                                </span>
                                <span
                                    className={
                                        validName || !username
                                            ? ' hidden'
                                            : 'text-red-600 ml-2 inline-block mb-[-4px]'
                                    }
                                >
                                    <FaTimes />
                                </span>
                            </p>
                        </label>
                        <input
                            ref={userRef}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="off"
                            aria-invalid={!validName}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        {/* eslint-disable-next-line no-mixed-spaces-and-tabs */}
                        <p
                            id="uidnote"
                            className={
                                userFocus && username && !validName
                                    ? 'instructions'
                                    : 'offScreen'
                            }
                        >
                            <FaInfoCircle />
                            4 to 24 characters <br />
                            Must begin with a Letter <br />
                            Letters, numbers, hyphens, and underscore allowed
                        </p>

                        <label htmlFor="password">
                            <p>
                                Password:
                                <span
                                    className={
                                        validPwd
                                            ? 'text-lime-500 ml-2 inline-block mb-[-3px]'
                                            : 'hidden'
                                    }
                                >
                                    <FaCheck />
                                </span>
                                <span
                                    className={
                                        validPwd || !pwd
                                            ? ' hidden'
                                            : 'text-red-600 ml-2 inline-block mb-[-4px]'
                                    }
                                >
                                    <FaTimes />
                                </span>
                            </p>
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowPwd(!showPwd)}
                                className="absolute right-0 top-[5px] z-50"
                            >
                                {!showPwd ? <FaEye /> : <FaEyeSlash />}
                            </button>
                            <input
                                type={!showPwd ? 'password' : 'text'}
                                id="password"
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                aria-invalid={!pwd}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                className="w-full"
                            />
                        </div>
                        <p
                            id="pwdnote"
                            className={
                                pwdFocus && !validPwd
                                    ? 'instructions'
                                    : 'hidden'
                            }
                        >
                            <FaInfoCircle />
                            8 to 24 characters. <br />
                            Must include uppercase and lowercase letters, number
                            and a special character. <br />
                            Allowed special characters include:
                            <span aria-label="exclamation mark">!</span>
                            <span aria-label="at symbol">@</span>
                            <span aria-label="hashtag">#</span>
                            <span aria-label="dollar sign">$</span>
                            <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirmPassword">
                            <p>
                                Confirm Password:
                                <span
                                    className={
                                        validConfirmPwd && confirmPwd
                                            ? 'text-lime-500 ml-2 inline-block mb-[-3px]'
                                            : 'hidden'
                                    }
                                >
                                    <FaCheck />
                                </span>
                                <span
                                    className={
                                        validConfirmPwd || !confirmPwd
                                            ? ' hidden'
                                            : 'text-red-600 ml-2 inline-block mb-[-4px]'
                                    }
                                >
                                    <FaTimes />
                                </span>
                            </p>
                        </label>
                        <input
                            type={'password'}
                            id="confirmPassword"
                            value={confirmPwd}
                            onChange={(e) => setConfirmPwd(e.target.value)}
                            required
                            aria-invalid={!confirmPwd}
                            aria-describedby="confirmnote"
                            onFocus={() => setConfirmPwdFocus(true)}
                            onBlur={() => setConfirmPwdFocus(false)}
                        />
                        <p
                            id="confirmnote"
                            className={
                                confirmPwdFocus && !validConfirmPwd
                                    ? 'instructions'
                                    : 'hidden'
                            }
                        >
                            <FaInfoCircle />
                            Must match the first password input field.
                        </p>

                        <button
                            type="submit"
                            className="mt-8 bg-white"
                            disabled={
                                !validName || !validPwd || !validConfirmPwd
                            }
                        >
                            Sign Up
                        </button>
                    </form>
                    <p>
                        Already Registered ? <br />
                        <span className="inline underline">
                            <a href="#">Sign In</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default Register;

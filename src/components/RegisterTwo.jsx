// eslint-disable-next-line no-unused-vars
import { useEffect, useRef, useState } from 'react';
import {
    FaCheck,
    FaEye,
    FaEyeSlash,
    FaInfoCircle,
    FaTimes,
} from 'react-icons/fa';

import Axios from '../api/axios.js';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/register';

const RegisterTwo = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [confirmPwd, setConfirmPwd] = useState('');
    const [validConfirmPwd, setValidConfirmPwd] = useState(false);
    const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

    const [showPwd, setShowPwd] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // UseEffect to focus the on the username input on page load
    useEffect(() => {
        userRef.current?.focus();
    }, []);

    // UseEffect for testing if the username is valid
    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidName(result);
    }, [username]);

    // UseEffect for testing password and confirm password
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === confirmPwd;
        setValidConfirmPwd(match);
    }, [pwd, confirmPwd]);

    // UseEffect for when there's an error
    useEffect(() => {
        setErrorMsg('');
    }, [username, pwd, confirmPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button is enabled with JS hack
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrorMsg('Invalid Entry');
            return;
        }

        try {
            const response = await Axios.post(
                REGISTER_URL,
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
            // console.log(response?.data?.accessToken);
            setUsername('');
            setPwd('');
            setConfirmPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrorMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrorMsg('Username Taken');
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
                    <h1>Register</h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            <p>
                                Username:
                                <span
                                    className={
                                        validName
                                            ? 'text-lime-500' +
                                              ' ml-2 inline-block mb-[-3px]'
                                            : 'hidden'
                                    }
                                >
                                    <FaCheck />
                                </span>
                                <span
                                    className={
                                        username && !validName
                                            ? 'text-red-600 ml-2 inline-block mb-[-4px]'
                                            : 'hidden'
                                    }
                                >
                                    <FaTimes />
                                </span>
                            </p>
                        </label>
                        <input
                            id="username"
                            ref={userRef}
                            type="text"
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby="instruct-note"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p
                            id="instruct-note"
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

                        <label htmlFor="pwd">
                            Password:
                            <span
                                className={
                                    validPwd
                                        ? 'text-lime-500 ml-2' +
                                          ' inline-block mb-[-3px]'
                                        : 'hidden'
                                }
                            >
                                <FaCheck />
                            </span>
                            <span
                                className={
                                    validPwd || !pwd
                                        ? 'hidden'
                                        : 'text-red-600 ml-2 inline-block mb-[-4px]'
                                }
                            >
                                <FaTimes />
                            </span>
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
                                id="pwd"
                                required
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                                aria-invalid={!validPwd}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                className="w-full"
                            />
                        </div>
                        <p
                            id="pwdnote"
                            className={
                                pwdFocus && !validPwd && pwd
                                    ? 'instructions'
                                    : 'offScreen'
                            }
                        >
                            <FaInfoCircle />
                            8 to 24 characters. <br />
                            Must include uppercase and lowercase letters, number
                            and a special character. <br />
                            Allowed special characters include
                            <span aria-label="exclamation mark">!</span>
                            <span aria-label="at symbol">@</span>
                            <span aria-label="hashtag">#</span>
                            <span aria-label="dollar sign">$</span>
                            <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirmPwd">
                            Confirm Password:
                            <span
                                className={
                                    validConfirmPwd && confirmPwd
                                        ? 'text-lime-500 ml-2' +
                                          ' inline-block mb-[-3px]'
                                        : 'hidden'
                                }
                            >
                                <FaCheck />
                            </span>
                            <span
                                className={
                                    validConfirmPwd || !confirmPwd
                                        ? 'hidden'
                                        : 'text-red-600 ml-2 inline-block mb-[-4px]'
                                }
                            >
                                <FaTimes />
                            </span>
                        </label>

                        <input
                            id="confirmPwd"
                            type="password"
                            value={confirmPwd}
                            onChange={(e) => setConfirmPwd(e.target.value)}
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
                                    : 'offScreen'
                            }
                        >
                            <FaInfoCircle className="inline-block mr-1" />
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

export default RegisterTwo;

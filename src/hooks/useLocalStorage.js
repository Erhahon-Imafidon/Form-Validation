import { useEffect, useState } from 'react';

// making this hook more robust to use it for any key and value
const getLocalValue = (key, initValue) => {
    // for SSR, Next.js or other SSR frameworks
    if (typeof window === 'undefined') return initValue;

    // if the value is already in the localStorage
    const localValue = localStorage.getItem(key);
    if (localValue) return JSON.parse(localValue);

    // if the value is the result of a function
    if (initValue instanceof Function) return initValue();

    return initValue;
};

const useLocalStorage = (key, initValue) => {
    const [value, setValue] = useState(getLocalValue(key, initValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;

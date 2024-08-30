import { useEffect, useState } from 'react';
import axios from '../api/axios.js';

const USERS = '/users';

const Users = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        let isMounted = true;
        const controllers = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axios.get(USERS, {
                    signal: controllers.signal,
                });
                console.log(response.data);
                isMounted && setUsers(response?.data);
            } catch (err) {
                console.log(err);
            }
        };

        getUsers();
        // cleanup Function for when the components unmount
        return () => {
            isMounted = false;
            controllers.abort();
        };
    }, []);

    return (
        <article>
            {users?.length ? (
                <ul>
                    {users.map((user, i) => (
                        <li key={i}>{user?.username}</li>
                    ))}
                </ul>
            ) : (
                <p>No Users To Display</p>
            )}
            <br />
        </article>
    );
};

export default Users;

import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate.js';

const USERS = '/users';

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controllers = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(USERS, {
                    signal: controllers.signal,
                });
                console.log(response.data);
                const newUsers = response.data;
                isMounted && setUsers(newUsers);
            } catch (err) {
                console.log('Failed to fetch users', err);
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

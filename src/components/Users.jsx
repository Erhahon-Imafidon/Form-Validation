import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate.js';

const USERS = '/users';

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controllers = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(USERS, {
                    signal: controllers.signal,
                });
                // console.log(response.data);
                const newUsers = response.data;
                const userNames = newUsers.map((user) => user.username);
                isMounted && setUsers(userNames);
            } catch (err) {
                console.log('Failed to fetch users', err);
                if (err?.response?.status === 403) {
                    navigate('/login', {
                        state: { from: location },
                        replace: true,
                    });
                }
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
                        <li key={i}>{user}</li>
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

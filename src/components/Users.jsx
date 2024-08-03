import { useState } from 'react';

const Users = () => {
    const [users, setUsers] = useState();

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
        </article>
    );
};

export default Users;

import { Link } from 'react-router-dom';
import Users from '../components/Users.jsx';

const Admin = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <Users />
            <br />
            <div className="mt-auto">
                <Link to={'/'}>Home</Link>
            </div>
        </section>
    );
};

export default Admin;

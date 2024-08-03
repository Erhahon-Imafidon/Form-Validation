import { Link } from 'react-router-dom';
// import Users from '../components/Users.jsx';

const Admin = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            {/*<Users />*/}
            <br />
            <div className="flex-1">
                <Link to={'/'}>Home</Link>
            </div>
        </section>
    );
};

export default Admin;

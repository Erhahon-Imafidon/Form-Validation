import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const LinkPage = () => {
    const { setAuth } = useAuth();

    const handleLogout = () => {
        setAuth({});
    };

    return (
        <section className="space-y-4">
            <h1 className="font-bold text-2xl">Links</h1>

            <div className="flex flex-col">
                <h1>Public</h1>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
            <div className="flex flex-col">
                <h1>Private</h1>
                <Link to="/">Home</Link>
                <Link to="/editor">Editors Page</Link>
                <Link to="/admin"> Admin</Link>
            </div>
            <button className="bg-white text-black w-20 rounded-lg py-1">
                <Link onClick={handleLogout} to={'/login'}>
                    Sign Out
                </Link>
            </button>
        </section>
    );
};

export default LinkPage;

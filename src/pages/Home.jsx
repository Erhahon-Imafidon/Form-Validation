import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout.js';

const Home = () => {
    const Logout = useLogout();

    return (
        <section className="space-y-4">
            <h1>Home</h1>
            <p>You are logged in!</p>
            <Link to="/editor">Go to the Editor Page</Link>
            <Link to="/admin">Go to the Admin Page</Link>
            <Link to="/lounge">Go to the Lounge Page</Link>
            <Link to="/linkpage">Go to the Link Page Page</Link>
            <button
                onClick={Logout}
                className="bg-white text-black w-20 rounded-lg py-1"
            >
                Sign Out
            </button>
        </section>
    );
};

export default Home;

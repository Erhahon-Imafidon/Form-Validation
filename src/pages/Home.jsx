import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout.js';

const Home = () => {
    const navigate = useNavigate();
    const logOut = useLogout();

    const signOut = async () => {
        await logOut();
        navigate('/linkpage');
    };

    return (
        <section className="space-y-4">
            <h1>Home</h1>
            <p>You are logged in!</p>
            <Link className={'underline'} to="/editor">
                Go to the Editor Page
            </Link>
            <Link className={'underline'} to="/admin">
                Go to the Admin Page
            </Link>
            <Link className={'underline'} to="/lounge">
                Go to the Lounge Page
            </Link>
            <Link className={'underline'} to="/linkpage">
                Go to the Link Page Page
            </Link>
            <button
                onClick={signOut}
                className="bg-white text-black w-20 rounded-lg py-1"
            >
                Sign Out
            </button>
        </section>
    );
};

export default Home;

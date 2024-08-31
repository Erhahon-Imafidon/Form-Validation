import { Link } from 'react-router-dom';

const Lounge = () => {
    return (
        <section>
            <h1>Lounge</h1>
            <br />
            <p>Admins and Editors can hangout here</p>
            <br />
            <div className={'grow'}>
                <Link to={'/'}>Home</Link>
            </div>
        </section>
    );
};

export default Lounge;

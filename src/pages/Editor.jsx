import { Link } from 'react-router-dom';

const Editor = () => {
    return (
        <section>
            <h1>Editor&apos;s Page</h1>

            <p className={'mt-4'}>You must have been assigned an Editor role</p>
            <Link className={'block underline mt-auto'} to="/">
                Home
            </Link>
        </section>
    );
};

export default Editor;

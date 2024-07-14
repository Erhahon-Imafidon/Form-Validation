import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <section>
            <h1>Unauthorized</h1>
            <p className={'mt-4'}>
                You do not have access to the requested page
            </p>
            <button
                onClick={goBack}
                className="bg-white text-black w-20 rounded-lg py-1 mt-auto"
            >
                Go Back
            </button>
        </section>
    );
};

export default Unauthorized;

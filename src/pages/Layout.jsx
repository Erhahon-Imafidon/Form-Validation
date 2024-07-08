import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <main className="flex flex-col justify-center items-center min-h-screen py-4 px-2">
            <Outlet />
        </main>
    );
};

export default Layout;

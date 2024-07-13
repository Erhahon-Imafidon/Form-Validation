import { Route, Routes } from 'react-router-dom';
import {
    Admin,
    Editor,
    Home,
    Layout,
    LinkPage,
    Lounge,
    Missing,
    Unauthorized,
} from './pages/index.js';
import Login from './components/Login.jsx';
import RegisterTwo from './components/RegisterTwo.jsx';
import RequireAuth from './components/RequireAuth.jsx';

function App() {
    const ROLES = {
        User: 2001,
        Admin: 5150,
        Editor: 1984,
    };

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/*Public Routes*/}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<RegisterTwo />} />
                <Route path="linkpage" element={<LinkPage />} />
                <Route path="unauthorized" element={<Unauthorized />} />

                {/*Protected Routes*/}
                <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
                    <Route path="editor" element={<Editor />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                    <Route path="admin" element={<Admin />} />
                </Route>
                <Route
                    element={
                        <RequireAuth
                            allowedRoles={[ROLES.Editor, ROLES.Admin]}
                        />
                    }
                >
                    <Route path="lounge" element={<Lounge />} />
                </Route>

                {/*Catch All Routes*/}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;

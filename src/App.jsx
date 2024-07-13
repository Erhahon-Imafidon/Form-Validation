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
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/*Public Routes*/}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<RegisterTwo />} />
                <Route path="linkpage" element={<LinkPage />} />
                <Route path="unauthorized" element={<Unauthorized />} />

                {/*Protected Routes*/}
                <Route element={<RequireAuth allowedRoles={[2001]} />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[1984]} />}>
                    <Route path="editor" element={<Editor />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[5150]} />}>
                    <Route path="admin" element={<Admin />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[1984, 5150]} />}>
                    <Route path="lounge" element={<Lounge />} />
                </Route>

                {/*Catch All Routes*/}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;

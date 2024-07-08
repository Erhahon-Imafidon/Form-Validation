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

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/*Public Routes*/}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterTwo />} />
                <Route path="/linkpage" element={<LinkPage />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/*Protected Routes*/}
                <Route path="/" element={<Home />} />
                <Route path="editor" element={<Editor />} />
                <Route path="admin" element={<Admin />} />
                <Route path="lounge" element={<Lounge />} />

                {/*Catch All Routes*/}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;

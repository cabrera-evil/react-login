import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route
                path="/dashboard"
                element={<Dashboard />}
            />
        </Routes>
    );
}

export default App;

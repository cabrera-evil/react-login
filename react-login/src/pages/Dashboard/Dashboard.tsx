import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserService from './services/User.service';
import { UserInfo } from "./models/User.interface";
import { DecodedToken } from './models/DecodedToken.interface';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserInfo | null>(null); // Initialize user state with null

    const userService = new UserService();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/', { replace: true });
    }

    useEffect(() => {
        const decode: DecodedToken = jwtDecode(localStorage.getItem('token') || '');

        userService.getByUsername(decode.username)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                    Welcome
                </h1>
                <div className="mt-6">
                    {user ? (
                        <>
                            <p className="mt-2 text-gray-800">Username: {user.username}</p>
                            <p className="mt-2 text-gray-800">First Name: {user.firstName}</p>
                            <p className="mt-2 text-gray-800">Last Name: {user.lastName}</p>
                            <p className="mt-2 text-gray-800">Email: {user.email}</p>
                            <p className="mt-2 text-gray-800">Role: {user.role}</p>
                            <p className="mt-2 text-gray-800">Password: {user.password}</p>
                            <div className="mt-6">
                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

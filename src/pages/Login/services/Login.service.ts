import axios from "axios";
import { LoginRequest } from "../models/LoginRequest.interface";
import { toast } from "react-toastify";

export default class LoginService {
    async postLogin(data: LoginRequest): Promise<boolean> {
        try {
            const response = await axios.post(`auth/login`, data);
            localStorage.setItem('token', response.data.data.access_token);
            return true;
        } catch (error) {
            toast.error('Login failed!', {
                autoClose: 2000,
                toastId: 'login-failed'
            });
            return false;
        }
    }
}

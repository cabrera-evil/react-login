import axios from "axios";
import { LoginRequest } from "../models/LoginRequest.interface";
import { ApiResponse } from "../../../models/ApiResponse.type";

export default class LoginService {
    async postLogin(data: LoginRequest): Promise<ApiResponse> {
        const res = await axios.post(`auth/login`, data);

        // Set token to local storage
        if (res.data.statusCode === 200) {
            localStorage.setItem('token', res.data.data.access_token);
        }
        return res.data;
    }
}
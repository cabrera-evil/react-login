import axios from "axios";
import { ApiResponse } from "../../../models/ApiResponse.type";

export default class UserService {
    async getByUsername(username: string): Promise<ApiResponse> {
        return await axios.get(`users/filter?username=${username}`);
    }
}
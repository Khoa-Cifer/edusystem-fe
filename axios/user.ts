import { ResponseDto } from "@/interfaces/response-dto";
import { UserProfile } from "@/interfaces/user";
import api from "./http";

export class UserApi {
    static async getUserInfo(): Promise<ResponseDto<UserProfile>> {
        const response = await api.get('/authentication/user');
        return response.data;
    }
}
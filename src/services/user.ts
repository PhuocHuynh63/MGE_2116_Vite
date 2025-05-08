import { axiosClient } from "../configs/axios";
import { IUserRequest } from "../schemaValidations/model.schema";


const userService = {
    userRequest: async (data: IUserRequest) => {
        try {
            return await axiosClient.post('/user/request-point', data);
        } catch (error: any) {
            if (error.response) {
                return error;
            } else {
                throw new Error('Something went wrong');
            }
        }
    },
    getAllUser: async (current: number, pageSize: number) => {
        return await axiosClient.get(`user?current=${current}&pageSize=${pageSize}`);
    },
    searchByNameOrId: async (term: string, current: number, pageSize: number) => {
        return await axiosClient.get(`user/search?term=${term}&current=${current}&pageSize=${pageSize}`);
    },
    updateUser: async (data: any) => {
        return await axiosClient.post(`user/update-user`, data);
    },
    kingConfirm: async (secretKey: string) => {
        return await axiosClient.post(`user/king-confirm`, { secretKey });
    },
    login: async (data: any) => {
        return await axiosClient.post(`auth/login`, data);
    },
}

export default userService;
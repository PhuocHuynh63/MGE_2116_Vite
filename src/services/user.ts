import { IUserRequest } from "../schemaValidations/model.schema";
import { https } from "../utils/config";


const userService = {
    userRequest: async (data: IUserRequest) => {
        try {
            return await https.post('/user/request-point', data);
        } catch (error: any) {
            if (error.response) {
                return error;
            } else {
                throw new Error('Something went wrong');
            }
        }
    },
    getAllUser: async (current: number, pageSize: number) => {
        return await https.get(`user?current=${current}&pageSize=${pageSize}`);
    },
    searchByNameOrId: async (term: string, current: number, pageSize: number) => {
        return await https.get(`user/search?term=${term}&current=${current}&pageSize=${pageSize}`);
    }
}

export default userService;
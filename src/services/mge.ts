import { axiosClient } from "../configs/axios";

const mgeService = {
    getMge: (current: number, pageSize: number) => {
        return axiosClient.get(`/mge/all?current=${current}&pageSize=${pageSize}`);
    },
    getTypeMge: (typeMge: string) => {
        return axiosClient.get(`/mge/type-mge?typeMge=${typeMge}`);
    }
}

export default mgeService;
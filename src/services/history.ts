import { axiosClient } from "../configs/axios";

const historyService = {
    getHistoryLimitNine: (current: number, pageSize: number, sort: string) => {
        return axiosClient.get(`history?current=${current}&pageSize=${pageSize}&sort=${sort}`);
    },
}

export default historyService;
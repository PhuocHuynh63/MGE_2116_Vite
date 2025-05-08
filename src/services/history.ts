import { axiosClient } from "../configs/axios";

const historyService = {
    getHisory: (current: number, pageSize: number, sort: string) => {
        return axiosClient.get(`history?current=${current}&pageSize=${pageSize}&sort=${sort}`);
    },
    exportHistory: () => {
        return axiosClient.get(`history/export`);
    }
}

export default historyService;
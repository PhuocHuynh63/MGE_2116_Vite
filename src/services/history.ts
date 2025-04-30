import { axiosClient } from "../configs/axios";

const historyService = {
    getHistoryLimitNine: () => {
        return axiosClient.get('/history');
    },
}

export default historyService;
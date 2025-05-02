
import { axiosClient } from "../configs/axios";

const timerService = {
    getTimerActive: async (selectedFields: string) => {
        return await axiosClient.get(`/timer/timer-active?selectedFields=${selectedFields}`);
    },
    getATimer: (sort: string, status: string) => {
        return axiosClient.get(`/timer/timer-pending?sort=${sort}&status=${status}`);
    },
    setTimer: (data: any) => {
        return axiosClient.post('/timer/set-timer', data);
    },
    updateStatusTimerToPending: () => {
        return axiosClient.put('/timer/update/status-timer-pending', {});
    },
}

export default timerService;
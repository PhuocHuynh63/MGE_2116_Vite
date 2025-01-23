
import { https } from "../utils/config";

const timerService = {
    getTimerActive: async (selectedFields: string) => {
        return await https.get(`/timer/timer-active?selectedFields=${selectedFields}`);
    },
    getATimer: (sort: string, status: string) => {
        return https.get(`/timer/timer-pending?sort=${sort}&status=${status}`);
    },
    setTimer: (data: any) => {
        return https.post('/timer/set-timer', data);
    },
    updateStatusTimerToPending: () => {
        return https.put('/timer/update/status-timer-pending', {});
    }
}

export default timerService;
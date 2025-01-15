
import { https } from "../utils/config";

const timerService = {
    getTimerActive: (selectedFields: string) => {
        return https.get(`/timer/timer-active?selectedFields=${selectedFields}`);
    },
    getTimerPending: (sort: string) => {
        return https.get(`/timer/timer-pending?sort=${sort}`);
    },
    setTimer: (data: any) => {
        return https.post('/timer/set-timer', data);
    },
    updateStatusTimerToPending: () => {
        return https.put('/timer/update/status-timer-pending', {});
    }
}

export default timerService;
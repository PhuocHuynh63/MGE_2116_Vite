import { https } from "../utils/config";

const historyService = {
    getHistoryLimitNine: () => {
        return https.get('/history');
    },
}

export default historyService;
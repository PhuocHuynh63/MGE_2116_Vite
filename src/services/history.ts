import axios from "axios";

const historyService = {
    getHistoryLimitNine: () => {
        return axios.get('/history');
    },
}

export default historyService;
import { https } from "../utils/config";

const mgeService = {
    getMge: (current: number, pageSize: number) => {
        return https.get(`/mge/all?current=${current}&pageSize=${pageSize}`);
    },
    getTypeMge: (typeMge: string) => {
        return https.get(`/mge/type-mge?typeMge=${typeMge}`);
    }
}

export default mgeService;
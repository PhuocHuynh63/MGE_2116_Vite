import axios from "axios";
import { https } from "../utils/config";

const mgeService = {
    getMge: (current: number, pageSize: number) => {
        return https.get(`/mge/all?current=${current}&pageSize=${pageSize}`);
    },
}

export default mgeService;
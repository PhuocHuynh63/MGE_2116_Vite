import { IREDUX } from "../../types/IRedux";

export const initialState = {
    dataPoints: [],
    isLoadingDataPoints: true,
    typeMge: [],
    mge: [],
    timer: null,
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
} as IREDUX.IGLOBALSTATE;
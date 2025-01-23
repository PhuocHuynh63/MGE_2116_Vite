import { IMGE, ITimerCompleted, ITimerLeftActive, IUser } from "../schemaValidations/model.schema";

declare namespace IREDUX {
    interface IGLOBALSTATE {
        isLoadingDataPoints: boolean;
        dataPoints: IUser[];
        mge: IMGE[];
        timer: any;
        pagination: {
            current: number;
            pageSize: number;
            total: number;
        };
    }
}
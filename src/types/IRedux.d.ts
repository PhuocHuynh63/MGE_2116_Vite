import { IUser } from "../schemaValidations/model.schema";

declare namespace IREDUX {
    interface IGLOBALSTATE {
        isLoadingDataPoints: boolean;
        dataPoints: IUser[];
    }

}
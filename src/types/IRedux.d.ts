import { IUser } from "../schemaValidations/model.schema";

declare namespace IREDUX {
    interface IGLOBALSTATE {
        isLoading: boolean;
        dataPoints: IUser[];
    }

}
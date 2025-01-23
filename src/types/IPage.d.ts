import { IHistory, IMGE, ITimerCompleted, ITimerLeft, ITimerLeftActive, IUser } from "@/schemaValidations/model.schema";

declare namespace HOME {
    interface IHomePage {
        mgeData: IMGE;
        timer: ITimerLeftActive;
    }


    interface IFormInput {
        id: string;
        ingame: string;
        pointsRequest: number;
        secretKey: string;
        email?: string;
    }

    interface IUserRequestResponse {
        message: string;
        statusCode: number;
        data?: any;
    }
}

declare namespace RESULTS_TOP {
    interface IResultsTopPage {
        timer: HOME.ITimeLeft;
        timerCompleted: ITimerCompleted;
    }

    interface DataType {
        key: React.Key;
        top: number;
        ingame: string;
        id: string;
        points: number;
        date: string
    }
}

declare namespace HISTORY {
    interface IHistoryPage {
        data: IHistory;
    }
}

declare namespace DATA_POINTS {
    interface IDataType {
        key: number;
        no: number;
        ingame: string;
        id: string;
        points: string;
    }

    interface IDataPointsPage {
        data: IUser;
    }
}
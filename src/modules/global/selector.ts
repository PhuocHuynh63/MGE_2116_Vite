import { RootState } from "../../redux/store";

export const selectState = (state: RootState) => state.global;
export const selectLoadingDataPoints = (state: RootState) => state.global.isLoadingDataPoints;
export const selectDataPoints = (state: RootState) => state.global.dataPoints;
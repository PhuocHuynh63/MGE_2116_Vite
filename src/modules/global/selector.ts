import { RootState } from "../../redux/store";

export const selectState = (state: RootState) => state.global;
export const selectLoading = (state: RootState) => state.global.isLoading;
export const selectDataPoints = (state: RootState) => state.global.dataPoints;
import { RootState } from "../../redux/store";

export const selectState = (state: RootState) => state.global;
export const selectLoadingDataPoints = (state: RootState) => state.global.isLoadingDataPoints;
export const selectDataPoints = (state: RootState) => state.global.dataPoints;
export const selectMge = (state: RootState) => state.global.mge;
export const selectTimer = (state: RootState) => state.global.timer;
export const selectPagination = (state: RootState) => state.global.pagination;
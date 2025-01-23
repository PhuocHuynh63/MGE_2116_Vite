import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

const editorSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setDataPoints(state, action) {
            state.dataPoints = action.payload;
        },
        setIsLoadingDataPoints(state, action) {
            state.isLoadingDataPoints = action.payload;
        },
        setMge(state, action) {
            state.mge = action.payload;
        },
        setTimer(state, action) {
            state.timer = action.payload;
        },
        setPagination(state, action) {
            state.pagination = action.payload;
        },
    },
});

export const {
    setPagination,
    setTimer,
    setMge,
    setDataPoints,
    setIsLoadingDataPoints
} = editorSlice.actions;


export default editorSlice.reducer;

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
        }
    },
});

export const { setDataPoints, setIsLoadingDataPoints } = editorSlice.actions;


export default editorSlice.reducer;

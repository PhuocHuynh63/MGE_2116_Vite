import { call, put, takeLatest } from "redux-saga/effects";
import userService from "../../services/user";
import { setDataPoints, setIsLoadingDataPoints } from "./slice";

function* getDataPoints(action: any): Generator<any, void, any> {
    const { search, current, pageSize } = action.payload;
    try {
        const res = yield call(userService.searchByNameOrId, search, current, pageSize);
        const user = res.data.data.results.map((item: { id: string; ingame: string; points: number; }, index: number) => ({
            key: index,
            no: index + 1 + ((current || 1) - 1) * (pageSize || 10),
            ingame: item.ingame,
            id: item.id,
            points: item.points,
        }));

        yield put(setDataPoints(user || []));
        setIsLoadingDataPoints(false)
    } catch (error) {
        setIsLoadingDataPoints(false)
    }
}

export function* watchEditorGlobalSaga() {
    yield takeLatest("getDataPoints", getDataPoints);
}

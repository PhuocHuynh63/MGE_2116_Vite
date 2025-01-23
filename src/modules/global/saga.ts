import { call, put, takeLatest } from "redux-saga/effects";
import userService from "../../services/user";
import { setDataPoints, setIsLoadingDataPoints, setMge, setPagination, setTimer } from "./slice";
import mgeService from "../../services/mge";
import timerService from "../../services/timer";

function* getDataPoints(action: any): Generator<any, void, any> {
    const { search, current, pageSize } = action.payload;
    yield put(setIsLoadingDataPoints(true));

    try {
        const res = yield call(userService.searchByNameOrId, search, current, pageSize);
        const results = res.data.data.results.map((item: any, index: number) => ({
            key: index,
            no: index + 1 + ((current || 1) - 1) * (pageSize || 10),
            ingame: item.ingame,
            id: item.id,
            points: item.points.toLocaleString('vi-VN'),
        }));

        yield put(setDataPoints(results));
        yield put(setPagination({
            current: res.data.data.meta.current,
            pageSize: res.data.data.meta.pageSize,
            total: res.data.data.meta.totalItem,
        }));
    } catch (error) {
        console.error('Failed to fetch data points:', error);
    } finally {
        yield put(setIsLoadingDataPoints(false));
    }
}

function* getMge(action: any): Generator<any, void, any> {
    const typeMge = action.payload;
    try {
        const res = yield call(mgeService.getTypeMge, typeMge);
        yield put(setMge(res.data.data || []));
    } catch (error) {
        // console.log(error);
    }
}

function* getTimer(): Generator<any, void, any> {
    const apis = [
        () => timerService.getTimerActive('-users'),
        () => timerService.getATimer('desc', 'pending'),
        () => timerService.getATimer('desc', 'complete')
    ]

    for (const api in apis) {
        try {
            const res = yield call(apis[api]);
            yield put({ type: 'getMge', payload: res.data.data.typeMge || [] });
            yield put(setTimer(res.data.data || []));
            return
        } catch (error) {
            // console.log(error);
        }
    }

    yield put({ type: 'getMge', payload: 'Error fetching timer' });
    yield put(setTimer(null));
}

export function* watchEditorGlobalSaga() {
    yield takeLatest("getDataPoints", getDataPoints);
    yield takeLatest("getMge", getMge);
    yield takeLatest("getTimer", getTimer);
}

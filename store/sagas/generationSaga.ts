import { takeLatest, call, put } from 'redux-saga/effects';
import {
  fetchRecentRequest,
  fetchRecentSuccess,
  fetchRecentFailure,
  createGenerationRequest,
  createGenerationSuccess,
  createGenerationFailure,
} from '../slices/generationSlice';
import { api } from '../../lib/api';
import formatError from '../../lib/formatError';

function* handleFetchRecent(): Generator<any, void, any> {
  try {
    const res = yield call(api.get, '/generation/recent');
    yield put(fetchRecentSuccess(res.data));
  } catch (err: any) {
    const message = formatError(err);
    yield put(fetchRecentFailure(message));
  }
}

function* handleCreateGeneration(action: any): Generator<any, void, any> {
  try {
    const { file, prompt } = action.payload;
    const fd = new FormData();
    fd.append('file', file);
    fd.append('prompt', prompt);
    yield call(api.post, '/generation/create', fd);
    yield put(createGenerationSuccess());
    yield put(fetchRecentRequest());
  } catch (err: any) {
    const message = formatError(err);
    yield put(createGenerationFailure(message));
  }
}

export default function* generationSaga(): Generator<any, void, any> {
  yield takeLatest(fetchRecentRequest.type, handleFetchRecent);
  yield takeLatest(createGenerationRequest.type, handleCreateGeneration);
}

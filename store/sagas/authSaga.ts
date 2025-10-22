import { takeLatest, call, put } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
} from '../slices/authSlice';
import { api, setAuthToken } from '../../lib/api';
import { saveToken } from '../../lib/auth';
import formatError from '../../lib/formatError';

function* handleLogin(action: any): Generator<any, void, any> {
  try {
    const { username, password } = action.payload;
    const res = yield call(api.post, '/auth/login', { username, password });
    const token = res.data.access_token;
    setAuthToken(token);
    saveToken(token);
    yield put(loginSuccess({ token }));
  } catch (err: any) {
    const message = formatError(err);
    yield put(loginFailure({ error: message }));
  }
}

function* handleRegister(action: any): Generator<any, void, any> {
  try {
    const { username, password } = action.payload;
    yield call(api.post, '/auth/register', { username, password });
    yield put(registerSuccess());
  } catch (err: any) {
    const message = formatError(err);
    yield put(loginFailure({ error: message }));
  }
}

export default function* authSaga(): Generator<any, void, any> {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
}

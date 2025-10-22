import { all } from 'redux-saga/effects';
import authSaga from './sagas/authSaga';
import generationSaga from './sagas/generationSaga';

export default function* rootSaga() {
  yield all([authSaga(), generationSaga()]);
}

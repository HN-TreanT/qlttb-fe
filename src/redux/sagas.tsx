import { all } from "redux-saga/effects";
import authSaga from './auth/saga'
import stateSaga from './auth/saga'
import canboSaga from './canbo/saga'
export default function* rootSaga() {
   yield all([authSaga(), stateSaga(), canboSaga()]);
yield all([]);

}

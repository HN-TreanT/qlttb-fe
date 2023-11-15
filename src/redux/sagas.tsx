import { all } from "redux-saga/effects";
import authSaga from './auth/saga'
import stateSaga from './auth/saga'
import canboSaga from './canbo/saga'
import trangthietbiSaga from './trangthietbi/saga'
import loaittbSaga from './LoaiTTB/saga'
import phonghocSaga from './phonghoc/saga'
export default function* rootSaga() {
   yield all([authSaga(), stateSaga(), canboSaga(), trangthietbiSaga(), loaittbSaga(), phonghocSaga()]);
   yield all([]);

}

import { all } from "redux-saga/effects";
import authSaga from './auth/saga'
import stateSaga from './auth/saga'
import canboSaga from './canbo/saga'
import llvSaga from "./lichlamviec/saga"
import trangthietbiSaga from './trangthietbi/saga'
import loaittbSaga from './LoaiTTB/saga'
import phonghocSaga from './phonghoc/saga'
import lichhoctapSaga from './lichhoctap/saga'
import tinhtrangTTBSaga from './tinhtragnTTB/saga'
export default function* rootSaga() {
   yield all([authSaga(), stateSaga(), canboSaga(), trangthietbiSaga(), loaittbSaga(), phonghocSaga(), llvSaga(), lichhoctapSaga(), tinhtrangTTBSaga()]);
   yield all([]);

}

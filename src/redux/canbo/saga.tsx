import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { canboServices } from "../../utils/services/canbo";
import actions from "./actions";
import stateActions from "../state/action"

function* saga_loadData() {
  try {
     let _params: Promise<any> = yield select((state: any) => state.canbo.params)
     let params : any = _params
     yield put(stateActions.action.loadingState(true))
    let _response: Promise<any> = yield canboServices.get({
       ...params
    })
    let response : any = _response
    if (response.status) {
      yield put(actions.action.loadDataSuccess(response.data))
    }else {
      yield put(actions.action.loadDataSuccess({
        count: 0,
        data: []
      }))
    }
    
    yield put(stateActions.action.loadingState(false))

  } catch(err: any) {
     console.log(err)
  }
}
function* listen() {
  yield takeEvery(actions.types.lOAD_DATA, saga_loadData);
}

export default function* mainSaga() {
  yield all([fork(listen)]);
}

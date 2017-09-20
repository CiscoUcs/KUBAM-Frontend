import { put, all, call, takeEvery } from 'redux-saga/effects'
import sessionApi from '../services/session'
import networkApi from '../services/network'
import * as actions from '../actions'

export function* login(action) {
  let response = yield call(sessionApi.login, {
                      user : action.user,
                      password : action.password,
                      server : action.server
                    })
  if (response.error) {
    return yield put (actions.setLoginError(response)) 
  }
  yield put(actions.receivedLoginResponse(response))
}

export function* listVLANs() {
  let response = yield call(networkApi.list)
  if (response.error) {
    return yield put (actions.ucsError(response))
  }
  yield put(actions.receivedVLANs(response))
}

export function* watchLoginRequest() {
  yield takeEvery(actions.SUBMIT_CREDS, login);
}

export function* watchVLANRequest() {
  yield takeEvery(actions.UCS_LIST_VLANS, listVLANs)
}

export default function* rootSaga() {
  yield all([
    watchLoginRequest(),
    watchVLANRequest(),
  ])
}

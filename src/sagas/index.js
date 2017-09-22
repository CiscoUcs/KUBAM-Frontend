import { put, all, call, takeEvery } from 'redux-saga/effects'
import sessionApi from '../services/session'
import networkApi from '../services/network'
import serverApi from '../services/server'
import * as actions from '../actions'

export function* login(action) {
  let response = yield call(sessionApi.login, {
                      user : action.user,
                      password : action.password,
                      server : action.server
                    })
  if (response.error) {
    return yield put (actions.setLoginError(response.error)) 
  }
  
  yield put(actions.receivedLoginResponse(response))
}

export function* get_login() {
  let response = yield call(sessionApi.get_login)
  if (response.error) {
    return yield put (actions.setLoginError(response)) 
  }
  yield put(actions.loginChecked(response))
}

export function* delete_login() {
  let response = yield call(sessionApi.delete_login)
  if (response.error) {
    return yield put (actions.setLoginError(response.error)) 
  }
  //yield put(actions.receivedLoginResponse(response))
}

export function* listVLANs() {
  let response = yield call(networkApi.list)
  if (response.error) {
    return yield put (actions.ucsError(response.error))
  }
  yield put(actions.receivedVLANs(response.vlans))
}

// update vlans 
export function* updateVLAN(action) {
  let response = yield call(networkApi.updateVLAN, { vlan : action.vlan})
  if (response.error) {
    return yield put (actions.ucsError(response.error))
  }
  yield put(actions.receivedVLANs(response.vlans))
}

export function* listServers() {
  let response = yield call(serverApi.list)
  if (response.error) {
    return yield put (actions.ucsError(response.error))
  }
  yield put(actions.receivedServers(response.servers))
}

export function* watchLoginRequest() {
  yield takeEvery(actions.SUBMIT_CREDS, login);
  yield takeEvery(actions.CHECK_LOGIN, get_login);
  yield takeEvery(actions.LOGOUT, delete_login);
}

export function* watchUCSRequest() {
  yield takeEvery(actions.UCS_LIST_VLANS, listVLANs)
  yield takeEvery(actions.UCS_UPDATE_VLAN, updateVLAN)
  yield takeEvery(actions.UCS_LIST_SERVERS, listServers)
}

export default function* rootSaga() {
  yield all([
    watchLoginRequest(),
    watchUCSRequest(),
  ])
}

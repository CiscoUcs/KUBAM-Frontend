import { put, all, call, takeEvery } from 'redux-saga/effects'
import sessionApi from '../services/session'
import networkApi from '../services/network'
import serverApi from '../services/server'
import osApi from '../services/os'
import deployApi from '../services/deploy'
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


export function* fetchNetwork() {
  let response = yield call(networkApi.list)
  if (response.error) {
    return yield put (actions.ucsError(response.error))
  }
  yield put(actions.receivedNetwork(response.vlans, response.network))
}

export function* updateNetwork(action) {
  let response = yield call(networkApi.updateNetwork, { vlan : action.vlan, network: action.network})
  if (response.error) {
    return yield put (actions.ucsError(response.error))
  }
  
  yield put(actions.receivedNetwork(response.vlans, response.network))
}

export function* listServers() {
  let response = yield call(serverApi.list)
  if (response.error) {
    return yield put (actions.ucsError(response.error))
  }
  yield put(actions.receivedServers(response.servers, response.hosts))
}

export function* updateServers(action) {
  let response = yield call(serverApi.updateServers, { servers : action.servers, hosts: action.hosts})
  if (response.error) {
    return yield put (actions.ucsError(response.error))
  }
  yield put(actions.receivedServers(response.servers, response.hosts))
}

export function* listOSes() {
  let response = yield call(osApi.list)
  if (response.error) {
    return yield put (actions.kubamError(response.error))
  }
  yield put(actions.fetching())
  yield put(actions.receivedOSes(response.isos))
}


export function* getKeys() {
  //yield put(actions.fetching())
  let response = yield call(deployApi.fetchKeys)
  if (response.error) {
    return yield put (actions.kubamError(response.error))
  }
  yield put(actions.receivedKeys(response.keys))
}

export function* getKUBAMIP() {
  //yield put(actions.fetching())
  let response = yield call(deployApi.fetchKUBAMIP)
  if (response.error) {
    return yield put (actions.kubamError(response.error))
  }
  yield put(actions.receivedKUBAMIP(response.kubam_ip))
}
  
export function* deploy(action) {
  let response = yield call(deployApi.deploy, { keys : action.keys, kubam_ip: action.kubam_ip})
  if (response.error) {
    return yield put (actions.kubamError(response.error))
  }
  //TODO: do something here to show that it deployed. 
}
  

export function* watchLoginRequest() {
  yield takeEvery(actions.SUBMIT_CREDS, login);
  yield takeEvery(actions.CHECK_LOGIN, get_login);
  yield takeEvery(actions.LOGOUT, delete_login);
}

export function* watchUCSRequest() {
  yield takeEvery(actions.UCS_FETCH_NETWORK, fetchNetwork)
  yield takeEvery(actions.UCS_UPDATE_NETWORK, updateNetwork)
  yield takeEvery(actions.UCS_LIST_SERVERS, listServers)
  yield takeEvery(actions.UCS_UPDATE_SERVERS, updateServers)
  yield takeEvery(actions.LIST_OSES, listOSes)
  yield takeEvery(actions.GET_KEYS, getKeys)
  yield takeEvery(actions.GET_KUBAM_IP, getKUBAMIP)
  yield takeEvery(actions.DEPLOY, deploy)
}

export default function* rootSaga() {
  yield all([
    watchLoginRequest(),
    watchUCSRequest(),
  ])
}

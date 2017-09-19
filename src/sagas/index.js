import { put, all, call, takeEvery } from 'redux-saga/effects'
import sessionApi from '../services/session'
import * as actions from '../actions'

export function* login(action) {
  yield put(actions.setLoginPending(true))
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

export function* watchLoginRequest() {
  yield takeEvery(actions.SUBMIT_CREDS, login);
}

export default function* rootSaga() {
  yield all([
    watchLoginRequest(),
  ])
}

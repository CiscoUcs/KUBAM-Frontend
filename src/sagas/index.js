import { put, all, call, takeEvery, take } from 'redux-saga/effects'
import * as actions from '../actions'


const url = "http://localhost/api/v1"

export function* login(user, password, server) {
  console.log(user)
  console.log(password)
  console.log(server)
  try {
    var data = {"credentials" : {
                  "user" : user,
                  "server" : server,
                  "password" : password
                  } 
               }
    yield call(fetch, url + '/session', 
            { method: 'POST', 
              headers: {
                "Content-Type": "application/json" 
              },
              body: JSON.stringify(data)})
  }
  catch (err) {
    yield put (actions.setLoginError(err)) 
  }
}

export function* watchLoginRequest() {
  while (true) {
    const { user, password, server } = yield take(actions.SUBMIT_CREDS)
    yield call(login, user, password, server)
  } 
  //yield takeEvery(actions.SUBMIT_CREDS, login);
}

export default function* rootSaga() {
  yield all([
    watchLoginRequest(),
  ])
}

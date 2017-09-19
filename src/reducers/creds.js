import {
  SUBMIT_CREDS,
  CONFIRM_LOGIN
  SET_LOGIN
} from '../actions'

const submitCreds = (state = {
  server: "",
  user: "",
  isLoginPending: false,
  password: ""}, action) => {
  switch (action.type) {
    case SUBMIT_CREDS:
      return Object.assign({}, state, {
        isLoginPending: true, 
        loginError: false,
        isloginSuccess: false,
        user: action.user,
        password: action.password,
        server: action.server
      })
    case CONFIRM_LOGIN:
      return Object.assign({}, state, {
        isLoginPending: false,
        isLoginSuccess: true,
        isLoginError: false
      })

    default:
      return state
  }
}

export default submitCreds

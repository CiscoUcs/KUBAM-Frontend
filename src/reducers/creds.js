import {
  SUBMIT_CREDS,
  SET_LOGIN_ERROR,
  CONFIRM_LOGIN,
} from '../actions'

const submitCreds = (state = {
  server: "",
  user: "",
  password: "",
  loginError: "",
  isLoggedIn: false,
  isLoginError: false,
  isLoginPending: false
  }, action) => {
  switch (action.type) {
    case SUBMIT_CREDS:
      return Object.assign({}, state, {
        isLoginPending: true, 
        loginError: false,
        isloginSuccess: false,
        isLoggedIn: false,
        user: action.user,
        password: action.password,
        server: action.server
      })
    case CONFIRM_LOGIN:
      return Object.assign({}, state, {
        isLoginPending: false,
        isLoginSuccess: true,
        isLoginError: false,
        isLoggedIn: true,
        loginError: ""
      })
    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        isLoginPending: false,
        isLoginSuccess: false,
        isLoginError: true, 
        isLoggedIn: false,
        loginError: action.loginError
      })

    default:
      return state
  }
}

export default submitCreds

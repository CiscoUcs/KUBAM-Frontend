import {
  SUBMIT_CREDS,
  CONFIRM_LOGIN,
  SET_LOGIN_ERROR,
  LOGOUT,
  CHECK_LOGIN,
  LOGIN_CHECKED,
} from '../actions'

const submitCreds = (state = {
  server: "",
  user: "",
  password: "",
  loginError: "",
  isLoggedIn: false,
  isLoginPending: false
  }, action) => {
  switch (action.type) {
    // when the user presses the login button.
    case SUBMIT_CREDS:
      return Object.assign({}, state, {
        isLoginPending: true, 
        isloginSuccess: false,
        loginError: "",
        isLoggedIn: false,
        user: action.user,
        password: action.password,
        server: action.server
      })
    // When the server tells us we were able to log in and all was good. 
    case CONFIRM_LOGIN:
      console.log(action)
      return Object.assign({}, state, {
        isLoginPending: false,
        isLoginSuccess: true,
        isLoggedIn: true,
        loginError: ""
      })
    // if we get an error back from the API server when trying to login.
    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        isLoginPending: false,
        isLoginSuccess: false,
        isLoggedIn: false,
        loginError: action.loginError || "" 
      })

    // if we tried to see if they already had credentials
    case LOGIN_CHECKED:
      if (action.response && action.response.credentials && action.response.credentials.ip && action.response.credentials.user) {
        return Object.assign({}, state, {
          isLoginPending: false,
          isLoginSuccess: true,
          isLoggedIn: true,
          loginError: "",
          user: action.response.credentials.user,
          server: action.response.credentials.ip,
        })
      }
      return Object.assign({}, state, {
        isLoginPending: false,
        isLoginSuccess: false,
        isLoggedIn: false,
        loginError: "",
        user: "",
        server: "",
      })
    
    // when page first loads, checks to see if the kubam.yaml file has the login
    // then automatically logs in. 
    case CHECK_LOGIN:
      return Object.assign({}, state, {
        isLoginPending: true,
        
      })
    // when the logout button is pressed. 
    case LOGOUT:
      return Object.assign({}, state, {
        isLoginPending: false,
        isLoginSuccess: false,
        isLoggedIn: false,
        loginError: action.loginError || "" 
      })

    default:
      return state
  }
}

export default submitCreds

import {
  SUBMIT_CREDS,
  CONFIRM_LOGIN
} from '../actions'

const submitCreds = (state = {
  server: null,
  user: null,
  isLoginPending: false,
  password: null}, action) => {
  switch (action.type) {
    case SUBMIT_CREDS:
      return Object.assign({}, state, {
        isLoginPending: true, 
        user: action.user,
        password: action.password,
        server: action.server
      })
    case CONFIRM_LOGIN:
      return Object.assign({}, state, {
        isLoginPending: false,
        isLoginSuccess: true
      })

    default:
      return state
  }
}

export default submitCreds

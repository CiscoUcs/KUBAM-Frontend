import fetch from 'isomorphic-fetch';
export const SUBMIT_CREDS = 'SUBMIT_CREDENTIALS'
export const CONFIRM_LOGIN = 'CONFIRM_LOGIN'
export const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export const selectTab = (selected) => ({
  type: 'SELECTED_TAB',
  selected
})


export const setLoginPending = (isLoginPending) => ({
  type: SET_LOGIN_PENDING,
  isLoginPending
})

export const setLoginSuccess = (isLoginSuccess) => ({
  type: SET_LOGIN_SUCCESS,
  isLoginSuccess
})

export const setLoginError = (loginError) => ({
  type: SET_LOGIN_ERROR,
  loginError
})


export const requestLogin = (user, password, server) => ({
  type: SUBMIT_CREDS,
  user,
  password,
  server
})

export const receivedLoginResponse = (json) => ({
  type: CONFIRM_LOGIN,
  response: json.data
})

// thunk action creator
export function attemptLogin(user, password, server) {
  return function(dispatch) {
    // show the api call is starting. 
    dispatch(requestLogin(user, password, server))
    return fetch('http://localhost/api/v1/session')
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json => 
        dispatch(receivedLoginResponse(json))
      )
  } 
}

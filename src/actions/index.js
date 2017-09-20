export const SUBMIT_CREDS = 'SUBMIT_CREDENTIALS'
export const CONFIRM_LOGIN = 'CONFIRM_LOGIN'
export const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const UCS_LIST_VLANS = 'UCS_LIST_VLANS';
export const UCS_ERROR = 'UCS_ERROR';
export const UCS_RECEIVED_VLANS = 'UCS_RECEIVED_VLANS';

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


export const setLoginError = (loginError) => ({
  type: SET_LOGIN_ERROR,
  loginError
})


export const requestLogin = (u, p, s) => ({
  type: SUBMIT_CREDS,
  user:  u,
  password: p,
  server: s
})

export const receivedLoginResponse = (response) => ({
  type: CONFIRM_LOGIN,
  response
})

// network
export const listVLANs = () => ({
  type: UCS_LIST_VLANS
})

export const ucsError = (error) => ({
  type: UCS_ERROR,
  error
})

export const receivedVLANs = (vlans) => ({
  type: UCS_RECEIVED_VLANS,
  vlans
})

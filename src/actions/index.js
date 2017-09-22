export const SUBMIT_CREDS = 'SUBMIT_CREDENTIALS'
export const CONFIRM_LOGIN = 'CONFIRM_LOGIN'
export const CHECK_LOGIN = 'CHECK_LOGIN'
export const LOGIN_CHECKED = 'LOGIN_CHECKED'
export const LOGOUT = 'LOGOUT'
export const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const UCS_LIST_VLANS = 'UCS_LIST_VLANS';
export const UCS_RECEIVED_VLANS = 'UCS_RECEIVED_VLANS';
export const UCS_UPDATE_VLAN = 'UCS_UPDATE_VLAN';
export const UCS_LIST_SERVERS = 'UCS_LIST_SERVERS';
export const UCS_UPDATE_SERVERS = 'UCS_UPDATE_SERVERS';
export const UCS_RECEIVED_SERVERS = 'UCS_RECEIVED_SERVERS';
export const UCS_ERROR = 'UCS_ERROR';

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

export const logout = () => ({
  type: LOGOUT
})

export const checkLogin = () => ({
  type: CHECK_LOGIN
})

export const loginChecked = (response) => ({
  type: LOGIN_CHECKED,
  response
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

export const updateVLAN = (vlan) => ({
  type: UCS_UPDATE_VLAN,
  vlan
})

// servers
export const listServers = () => ({
  type: UCS_LIST_SERVERS
})

export const receivedServers = (servers) => ({
  type: UCS_RECEIVED_SERVERS,
  servers
})

export const updateServers = (servers) => ({
  type: UCS_UPDATE_SERVERS,
  servers
})

// operating system actions.


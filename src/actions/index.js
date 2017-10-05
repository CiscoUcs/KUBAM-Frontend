export const SELECTED_TAB = 'SELECTED_TAB';
export const SUBMIT_CREDS = 'SUBMIT_CREDENTIALS';
export const CONFIRM_LOGIN = 'CONFIRM_LOGIN';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const LOGIN_CHECKED = 'LOGIN_CHECKED';
export const LOGOUT = 'LOGOUT';
export const LIST_OSES = 'LIST_OSES';
export const KUBAM_ERROR = 'KUBAM_API_ERROR';
export const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const UCS_LIST_VLANS = 'UCS_LIST_VLANS';
export const UCS_FETCH_NETWORK = 'UCS_FETCH_NETWORK';
export const UCS_RECEIVED_NETWORK = 'UCS_RECEIVED_NETWORK';
export const UCS_UPDATE_VLAN = 'UCS_UPDATE_VLAN';
export const UCS_UPDATE_NETWORK = 'UCS_UPDATE_NETWORK';
export const UCS_LIST_SERVERS = 'UCS_LIST_SERVERS';
export const UCS_UPDATE_SERVERS = 'UCS_UPDATE_SERVERS';
export const UCS_RECEIVED_SERVERS = 'UCS_RECEIVED_SERVERS';
export const UCS_ERROR = 'UCS_ERROR';
export const FETCHING = 'FETCHING';
export const RECEIVED_OS = 'RECEIVED_THE_OS_STUFF';

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
  type: SELECTED_TAB,
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
// get all the network settings for the network panel
export const fetchNetwork = () => ({
  type: UCS_FETCH_NETWORK
})

export const ucsError = (error) => ({
  type: UCS_ERROR,
  error
})


export const receivedNetwork = (vlans, network) => ({
  type: UCS_RECEIVED_NETWORK,
  vlans,
  network
})

export const updateNetwork = (vlan, network) => ({
  type: UCS_UPDATE_NETWORK,
  vlan,
  network,
})

// servers
export const listServers = () => ({
  type: UCS_LIST_SERVERS
})

export const receivedServers = (servers, hosts) => ({
  type: UCS_RECEIVED_SERVERS,
  servers,
  hosts
})

export const updateServers = (servers, hosts) => ({
  type: UCS_UPDATE_SERVERS,
  servers,
  hosts
})

// operating system actions.
export const listOSes = () => ({
  type: LIST_OSES,
})

export const kubamError = (error) => ({
  type: KUBAM_ERROR,
  error
})

export const fetching = () => ({
  type: FETCHING,
})

export const receivedOSes = (osList) => ({
  type: RECEIVED_OS,
  osList,
})

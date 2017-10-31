export const SELECTED_TAB = 'SELECTED_TAB';
export const SUBMIT_CREDS = 'SUBMIT_CREDENTIALS';
export const CONFIRM_LOGIN = 'CONFIRM_LOGIN';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const LOGIN_CHECKED = 'LOGIN_CHECKED';
export const LOGOUT = 'LOGOUT';
/* for getting the ISOs */
export const LIST_OSES = 'LIST_OSES';
export const RECEIVED_OS = 'RECEIVED_THE_OS_STUFF';
/* for getting and updating the ISO Maps */
export const GET_ISO_MAP = 'GET_ISO_MAP';
export const RECEIVED_ISO_MAP = 'RECEIVED_ISO_MAP';
export const UPDATE_ISO_MAP = 'UPDATE_ISO_MAP';
/* make ISO images */
export const MAKE_ISO_IMAGES = 'MAKE_ISO_IMAGES';
export const FINISHED_MAKING_ISO_IMAGES = 'MADE_ISO_IMAGES';

/* get catalog */
export const GET_CATALOG = 'GET_CATALOG';
export const RECEIVED_CATALOG = 'RECEIVED_CATALOG';

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
export const FETCHING = 'FETCHING';
export const GET_KEYS = 'GET_KEYS';
export const RECEIVED_KEYS = 'RECEIVED_KEYS';
export const GET_KUBAM_IP = 'GET_KUBAM_IP';
export const RECEIVED_KUBAM_IP = 'RECEIVED_KUBAM_IP';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const DID_UPDATE_SETTINGS = 'DID_UPDATE_SETTINGS';
export const DEPLOY = 'DEPLOY';
export const DESTROY = 'DESTROY';
export const DID_DEPLOY = 'DID_DEPLOY';

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

// ISO manipulation
export const receivedOSes = (osList) => ({
  type: RECEIVED_OS,
  osList,
})

export const getISOMap = () => ({
  type: GET_ISO_MAP
})

export const receivedISOMap = (isoMap) => ({
  type: RECEIVED_ISO_MAP,
  isoMap: isoMap,
})

export const updateISOMap = (isoMap) => ({
  type: UPDATE_ISO_MAP,
  isoMap,
})

export const makeISOImages = () => ({
  type: MAKE_ISO_IMAGES,
})

export const didMakeISOImages = () => ({
  type: FINISHED_MAKING_ISO_IMAGES,
})

// KUBAM IP address
export const getKUBAMIP = () => ({
  type: GET_KUBAM_IP
})

export const receivedKUBAMIP = (kubam_ip) => ({
  type: RECEIVED_KUBAM_IP,
  kubam_ip,
})

// SSH keys
export const getKeys = () => ({
  type: GET_KEYS
})

export const receivedKeys = (keys) => ({
  type: RECEIVED_KEYS,
  keys,
})

// update settings
export const updateSettings = (kubam_ip, keys) =>  ({
  type: UPDATE_SETTINGS,
  kubam_ip,
  keys,
})

export const didUpdateSettings = () => ({
  type: DID_UPDATE_SETTINGS,
})

// Deploy
export const deploy = () =>  ({
  type: DEPLOY,
})

export const destroy = () =>  ({
  type: DESTROY,
})

export const didDeploy= (msg) =>  ({
  type: DID_DEPLOY,
  msg,
})

export const getCatalog = () => ({
  type: GET_CATALOG,
})

export const receivedCatalog = (catalog) => ({
  type: RECEIVED_CATALOG,
  catalog,
})

import {
  RECEIVED_KEYS,
  RECEIVED_KUBAM_IP, 
  KUBAM_ERROR,
  UPDATE_SETTINGS,
  DID_UPDATE_SETTINGS,
} from '../actions'

const settings = (state = {
  keys: [],
  kubam_ip: "",
  fetching: false, 
  msg: "", 
  error: "", 
  }, action) => {
  switch (action.type) {
    case RECEIVED_KEYS:
      return Object.assign({}, state, {
        keys: action.keys,
        fetching: false,
        error: "",
      })
    case RECEIVED_KUBAM_IP:   
      console.log(action.kubam_ip)
      return Object.assign({}, state, {
        kubam_ip: action.kubam_ip,
        fetching: false,
        error: "",
      })
    case KUBAM_ERROR: 
      return Object.assign({}, state, {
        fetching: false,
        error: action.error,
      })
    case UPDATE_SETTINGS:
      return Object.assign({}, state, {
        keys: action.keys,
        kubam_ip: action.kubam_ip,
        fetching: true,
        error: "",
      })
    case DID_UPDATE_SETTINGS:
      return Object.assign({}, state, {
        fetching: false,
        error: "",
      })
    
    
    default:
      return state
  }
}
export default settings

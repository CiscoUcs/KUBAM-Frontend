import {
  RECEIVED_KEYS,
  RECEIVED_KUBAM_IP, 
  DEPLOY, 
  DESTROY, 
  DID_DEPLOY, 
  KUBAM_ERROR,
} from '../actions'

const deploy = (state = {
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
    case DEPLOY: 
      return Object.assign({}, state, {
        fetching: true,
        error: "",
      })
    case DESTROY: 
      return Object.assign({}, state, {
        fetching: true,
        error: "",
      })
    case KUBAM_ERROR: 
      return Object.assign({}, state, {
        fetching: false,
        error: action.error,
      })
    case DID_DEPLOY: 
      return Object.assign({}, state, {
        msg: action.msg,
        fetching: false,
        error: "",
      })
    
    default:
      return state
  }
}
export default deploy

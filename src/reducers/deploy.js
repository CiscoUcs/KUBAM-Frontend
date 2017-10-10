import {
  RECEIVED_KEYS,
  RECEIVED_KUBAM_IP, 
} from '../actions'

const deploy = (state = {
  keys: [],
  kubam_ip: "",
  }, action) => {
  switch (action.type) {
    case RECEIVED_KEYS:
      console.log(action.keys)
      return Object.assign({}, state, {
        keys: action.keys,
      })
    case RECEIVED_KUBAM_IP:   
      console.log(action.kubam_ip)
      return Object.assign({}, state, {
        kubam_ip: action.kubam_ip,
      })
    default:
      return state
  }
}
export default deploy

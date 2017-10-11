import {
  KUBAM_ERROR,
  UCS_UPDATE_SERVERS,
  UCS_RECEIVED_SERVERS,
} from '../actions'

const server = (state = {
  servers: [],
  hosts: [],
  error: "",
  }, action) => {
  switch (action.type) {
    case UCS_RECEIVED_SERVERS:
      return Object.assign({}, state, {
        servers: action.servers,
        hosts: action.hosts,
        error: "",
      })
     case UCS_UPDATE_SERVERS:
      return Object.assign({}, state, {
        servers: action.servers,
        hosts: action.hosts,
        error: "",
      })
    case KUBAM_ERROR: 
      return Object.assign({}, state, {
        error: action.error
      })
    default:
      return state
  }
}
export default server

import {
  KUBAM_ERROR,
  UCS_UPDATE_SERVERS,
  UCS_RECEIVED_SERVERS,
  UCS_LIST_SERVERS,
} from '../actions'

const server = (state = {
  servers: [],
  hosts: [],
  error: "",
  working: false,
  }, action) => {
  switch (action.type) {
    case UCS_RECEIVED_SERVERS:
      return Object.assign({}, state, {
        servers: action.servers,
        hosts: action.hosts,
        error: "",
        working: false,
      })
     case UCS_UPDATE_SERVERS:
      return Object.assign({}, state, {
        servers: action.servers,
        hosts: action.hosts,
        working: true,
        error: "",
      })
    case KUBAM_ERROR: 
      return Object.assign({}, state, {
        error: action.error,
        working: false
      })
    case UCS_LIST_SERVERS:
      return Object.assign({}, state, {
        working: true,
      })
    default:
      return state
  }
}
export default server

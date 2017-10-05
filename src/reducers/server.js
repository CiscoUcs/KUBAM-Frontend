import {
  UCS_ERROR,
  UCS_UPDATE_SERVERS,
  UCS_RECEIVED_SERVERS,
} from '../actions'

const server = (state = {
  servers: [],
  hosts: [],
  ucsError: "",
  }, action) => {
  switch (action.type) {
    case UCS_RECEIVED_SERVERS:
      return Object.assign({}, state, {
        servers: action.servers,
        hosts: action.hosts,
      })
     case UCS_UPDATE_SERVERS:
      return Object.assign({}, state, {
        servers: action.servers,
        hosts: action.hosts,
      })
    case UCS_ERROR: 
      return Object.assign({}, state, {
        ucsError: action.error
      })
    default:
      return state
  }
}
export default server

import {
  KUBAM_ERROR,
  UCS_UPDATE_SERVERS,
  UCS_RECEIVED_SERVERS,
  UCS_LIST_SERVERS,
  RECEIVED_CATALOG,
} from '../actions'

const server = (state = {
  servers: [],
  hosts: [],
  error: "",
  catalog: {},
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
    /* maybe don't show working here since UCS may be the thing we wait on.
    case GET_CATALOG:
      return Object.assign({}, state, {
        working: true,
      })*/
    case RECEIVED_CATALOG:
      return Object.assign({}, state, {
        catalog: action.catalog,
      })
    default:
      return state
  }
}
export default server

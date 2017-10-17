import {
  KUBAM_ERROR,
  UCS_RECEIVED_NETWORK,
  UCS_UPDATE_NETWORK,
  UCS_FETCH_NETWORK,
} from '../actions'

const network = (state = {
  vlans: [],
  vlan: "",
  fetching: false, 
  network: {},
  error: "",
  }, action) => {
  switch (action.type) {
    case UCS_RECEIVED_NETWORK:
      return Object.assign({}, state, {
        vlans: action.vlans,
        network: action.network,
        error: "",
        fetching: false,
      })

    case UCS_UPDATE_NETWORK:
      return Object.assign({}, state, {
        vlan: action.vlan,
        network: action.network,
        error: "",
        fetching: true,  
      })
    
    case KUBAM_ERROR: 
      return Object.assign({}, state, {
        error: action.error,
        fetching: false,
      })
    case UCS_FETCH_NETWORK: 
      return Object.assign({}, state, {
        error: "", 
        fetching: true,
      })
    default:
      return state
  }
}
export default network

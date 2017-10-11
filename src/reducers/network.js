import {
  KUBAM_ERROR,
  UCS_RECEIVED_NETWORK,
  UCS_UPDATE_NETWORK,
} from '../actions'

const network = (state = {
  vlans: [],
  vlan: "",
  network: {},
  error: "",
  }, action) => {
  switch (action.type) {
    case UCS_RECEIVED_NETWORK:
      return Object.assign({}, state, {
        vlans: action.vlans,
        network: action.network,
        error: "",
      })

    case UCS_UPDATE_NETWORK:
      return Object.assign({}, state, {
        vlan: action.vlan,
        network: action.network,
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
export default network

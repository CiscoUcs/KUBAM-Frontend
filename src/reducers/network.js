import {
  UCS_ERROR,
  UCS_RECEIVED_NETWORK,
  UCS_UPDATE_NETWORK,
} from '../actions'

const network = (state = {
  vlans: [],
  vlan: "",
  network: {},
  ucsError: "",
  }, action) => {
  switch (action.type) {
    case UCS_RECEIVED_NETWORK:
      return Object.assign({}, state, {
        vlans: action.vlans,
        network: action.network,
      })

    case UCS_UPDATE_NETWORK:
      return Object.assign({}, state, {
        vlan: action.vlan,
        network: action.network
      })
    
    case UCS_ERROR: 
      return Object.assign({}, state, {
        ucsError: action.error
      })
    default:
      return state
  }
}
export default network

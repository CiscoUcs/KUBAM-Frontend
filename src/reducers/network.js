import {
 /* UCS_LIST_VLANS, */
  UCS_ERROR,
  UCS_UPDATE_VLAN,
  UCS_RECEIVED_VLANS,
} from '../actions'

const network = (state = {
  vlans: [],
  vlan: "",
  ucsError: "",
  }, action) => {
  switch (action.type) {
    case UCS_RECEIVED_VLANS:
      return Object.assign({}, state, {
        vlans: action.vlans,
      })
    case UCS_UPDATE_VLAN:
      return Object.assign({}, state, {
        vlan: action.vlan,
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

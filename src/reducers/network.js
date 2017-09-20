import {
 /* UCS_LIST_VLANS, */
  UCS_ERROR,
  UCS_RECEIVED_VLANS,
} from '../actions'

const network = (state = {
  vlans: [],
  ucsError: "",
  }, action) => {
  switch (action.type) {
    case UCS_RECEIVED_VLANS:
      return Object.assign({}, state, {
        vlans: action.vlans,
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

import {
  KUBAM_ERROR,
  FETCHING,
  RECEIVED_OS,
} from '../actions'

const os = (state = {
  osList: [],
  error: "",
  fetching: false,
  }, action) => {
  switch (action.type) {
    case RECEIVED_OS:
      return Object.assign({}, state, {
        osList: action.osList,
        error: "",
        fetching: false,
      })
     case FETCHING:
      return Object.assign({}, state, {
        fetching: true,
      })
    case KUBAM_ERROR: 
      return Object.assign({}, state, {
        error: action.error,
        fetching: false,
      })
    default:
      return state
  }
}
export default os

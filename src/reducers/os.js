import {
  FETCHING,
  RECEIVED_OS,
  GET_ISO_MAP,
  RECEIVED_ISO_MAP,
  UPDATE_ISO_MAP,
  MAKE_ISO_IMAGES,
  FINISHED_MAKING_ISO_IMAGES,
  ISO_ERROR,
} from '../actions'

const os = (state = {
  osList: [],
  isoMap: [],
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
    case ISO_ERROR: 
      return Object.assign({}, state, {
        error: action.error,
        fetching: false,
      })
    case GET_ISO_MAP:
      return Object.assign({}, state, {
        error: "",
        fetching: true,
      })
    case UPDATE_ISO_MAP:
      return Object.assign({}, state, {
        fetching: true,
      })
    case RECEIVED_ISO_MAP:
      return Object.assign({}, state, {
        isoMap: action.isoMap,
        error: "",
        fetching: false,
      })
    case MAKE_ISO_IMAGES:
      return Object.assign({}, state, {
        error: "",
        fetching: true,
      })
    case FINISHED_MAKING_ISO_IMAGES:
      return Object.assign({}, state, {
        fetching: false,
      })
 
    default:
      return state
  }
  
}
export default os

import {
  FETCHING,
  RECEIVED_OS,
  GET_ISO_MAP,
  RECEIVED_ISO_MAP,
  RECEIVED_CATALOG,
  UPDATE_ISO_MAP,
  KUBAM_ERROR,
} from '../actions'

const os = (state = {
  osList: [],
  isoMap: [],
  catalog: {},
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
    case GET_ISO_MAP:
      return Object.assign({}, state, {
        error: "",
        fetching: true,
      })
    case UPDATE_ISO_MAP:
      console.log(action.isoMap)
      return Object.assign({}, state, {
        fetching: true,
        isoMap: action.isoMap,
      })
    case RECEIVED_ISO_MAP:
      return Object.assign({}, state, {
        isoMap: action.isoMap,
        error: "",
        fetching: false,
      })
    case RECEIVED_CATALOG:
      return Object.assign({}, state, {
        catalog: action.catalog,
      })
    default:
      return state
  }
  
}
export default os

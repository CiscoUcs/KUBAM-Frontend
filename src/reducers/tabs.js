import {
  SELECTED_TAB,
} from '../actions'


const tabs = (state = {
  //selected: "Credentials",
  selected: "OS",
  }, action) => {
  switch (action.type) {
    case SELECTED_TAB:
      return Object.assign({}, state, {
        selected: action.selected,
      })
    default:
      return state
  }
}

export default tabs

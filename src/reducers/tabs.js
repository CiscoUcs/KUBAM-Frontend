import {
  SELECTED_TAB,
} from '../actions'


const tabs = (state = {
  selected: "Credentials",
  //selected: "Network",
  //selected: "Servers",
  //selected: "OS",
  //selected: "Deploy",
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

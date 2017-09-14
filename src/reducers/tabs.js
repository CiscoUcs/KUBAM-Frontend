const tabs = (state = "Credentials" , action) => {
  switch (action.type) {
    case 'SELECTED_TAB':
      return action.selected
    default:
      return state
  }
}

export default tabs

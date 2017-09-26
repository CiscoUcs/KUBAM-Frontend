import { connect } from 'react-redux'
import { selectTab } from '../actions'
import StepsBar from '../components/StepsBar'

const mapStateToProps = (state, ownProps) => ({
  selected: state.tabs.selected
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (tab) => {
    dispatch(selectTab(tab))
  }

})

const SelectTab = connect(
  mapStateToProps,
  mapDispatchToProps
)(StepsBar)

export default SelectTab

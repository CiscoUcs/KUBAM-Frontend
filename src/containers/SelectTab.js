import { connect } from 'react-redux'
import { selectTab } from '../actions'
import StepsBar from '../components/StepsBar'

const mapStateToProps = (state, ownProps) => ({
  selected: state.tabs
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (tab) => {
    //console.log(tab)
    dispatch(selectTab(tab))
  }

})

const SelectTab = connect(
  mapStateToProps,
  mapDispatchToProps
)(StepsBar)

export default SelectTab

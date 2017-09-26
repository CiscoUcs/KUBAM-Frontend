import { connect } from 'react-redux'
import Panel from '../components/Panel'

const mapStateToProps = (state, ownProps) => ({
  selected: state.tabs.selected
})

const PanelController = connect(
  mapStateToProps,
  null
)(Panel)

export default PanelController

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listVLANs } from '../actions'
import NetworkList  from '../components/panels/network/'

class Network extends Component {
  componentDidMount() {
    this.props.listVLANS()
  }
  render() {
    return (
      <NetworkList vlans={this.props.vlans} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  vlans: state.network.vlans
})

const mapDispatchToProps = (dispatch)  => ({
  listVLANS: () => dispatch(listVLANs()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Network)

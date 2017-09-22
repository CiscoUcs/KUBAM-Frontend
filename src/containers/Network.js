import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listVLANs, updateVLAN } from '../actions'
import NetworkList  from '../components/panels/network/'

class Network extends Component {
  componentDidMount() {
    this.props.listVLANS()
  }

  clickFunc = (event, name) => {
    event.preventDefault();
    this.props.updateVLAN(name) 
  }

  render() {
    return (
      <NetworkList vlans={this.props.vlans} clickFunc={this.clickFunc}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  vlans: state.network.vlans
})

const mapDispatchToProps = (dispatch)  => ({
  listVLANS: () => dispatch(listVLANs()),
  updateVLAN: (vlan) => dispatch(updateVLAN(vlan)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Network)

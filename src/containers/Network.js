import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNetwork, updateNetwork } from '../actions'
import NetworkList  from '../components/panels/network/'

class Network extends Component {
  componentDidMount() {
    this.props.fetchNetwork()
  }

  clickFunc = (event) => {
    event.preventDefault();
    var network = {}
    network['netmask'] = document.getElementById("netmask").value;
    network['gateway'] = document.getElementById("router").value;
    network['nameserver'] = document.getElementById("nameserver").value;
    var vlan = document.getElementById("vlan").value
    this.props.updateNetwork(vlan, network) 
  }

  render() {
    return (
      <NetworkList vlans={this.props.vlans} network={this.props.network} clickFunc={this.clickFunc}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  vlans: state.network.vlans,
  network: state.network.network
})

const mapDispatchToProps = (dispatch)  => ({
  fetchNetwork: () => dispatch(fetchNetwork()),
  updateNetwork: (vlan, network) => dispatch(updateNetwork(vlan, network)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Network)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNetwork, updateNetwork } from '../actions'
import NetworkList  from '../components/panels/network/'

class Network extends Component {
  constructor(props) {
    super(props);
    this.state = { network : {netmask: this.props.network.netmask || "", 
                  gateway: this.props.network.gateway || "",
                  nameserver: this.props.network.nameserver || ""}}
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log("Next props", nextProps)
    console.log("Next props", nextProps.network)
    console.log("state:", this.state)
    this.setState({network : {netmask : nextProps.network.netmask,
                    gateway: nextProps.network.gateway,   
                    nameserver: nextProps.network.nameserver
                  }})
  }

  componentDidMount() {
    this.props.fetchNetwork()
  }
 
  // update the form elements 
  handleChange = (event) => {
    const network = this.state.network
    switch(event.target.id) {
      case "netmask":
        network.netmask = event.target.value
        break;
      case "gateway":
        network.gateway = event.target.value
        break;
      case "nameserver":
        network.nameserver = event.target.value
        break;
      default:
        network.nameserver = network.nameserver
    }
    this.forceUpdate();
  }


  clickFunc = (event) => {
    event.preventDefault();
    var network = {}
    network['netmask'] = document.getElementById("netmask").value;
    network['gateway'] = document.getElementById("gateway").value;
    network['nameserver'] = document.getElementById("nameserver").value;
    var vlan = document.getElementById("vlan").value
    this.props.updateNetwork(vlan, network) 
  }

  render() {
    return (
      <NetworkList vlans={this.props.vlans} network={this.state.network} clickFunc={this.clickFunc} onChange={this.handleChange} />
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

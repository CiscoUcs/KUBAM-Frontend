import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNetwork, updateNetwork } from '../actions'
import NetworkList  from '../components/panels/network/'
import Error from '../components/Error'

class Network extends Component {
  constructor(props) {
    super(props);
    this.state = { network : {netmask: this.props.network.netmask || "", 
                  gateway: this.props.network.gateway || "",
                  nameserver: this.props.network.nameserver || ""
                  },
                  working: this.props.working || false, 
                  vlans: this.props.vlans || [],
                  }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({network : {netmask : nextProps.network.netmask,
                    gateway: nextProps.network.gateway,   
                    nameserver: nextProps.network.nameserver
                    },
                   working: nextProps.working,
                   vlans: nextProps.vlans})
  }

  componentDidMount() {
    this.props.fetchNetwork()
  }

  // update the form elements 
  handleChange = (event) => {
    const network = this.state.network
    var vlans = this.state.vlans
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
      case "vlan":
        var newVlans = vlans.map( (v) => {
            v.selected = false
            if (v.name === event.target.value) {
              v.selected = true
            }
            return v
          })
        vlans = newVlans
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
      <div>
        <Error error={this.props.error} />
        <NetworkList working={this.state.working} vlans={this.state.vlans} network={this.state.network} clickFunc={this.clickFunc} onChange={this.handleChange} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  vlans: state.network.vlans,
  network: state.network.network,
  error: state.network.error,
  working: state.network.fetching, 
})

const mapDispatchToProps = (dispatch)  => ({
  fetchNetwork: () => dispatch(fetchNetwork()),
  updateNetwork: (vlan, network) => dispatch(updateNetwork(vlan, network)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Network)

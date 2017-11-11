import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNetwork, updateNetwork } from '../actions'
import NetworkList  from '../components/panels/network/'
import Error from '../components/Error'

class Network extends Component {
  constructor(props) {
    super(props);
    this.state = { netmask: this.props.network.netmask ,
                   gateway: this.props.network.gateway ,
                  nameserver: this.props.network.nameserver ,
                  ntpserver: this.props.network.ntpserver ,
                  working: this.props.working || false, 
                  vlans: this.props.vlans || [],
                  }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({netmask : nextProps.network.netmask ,
                   gateway: nextProps.network.gateway ,   
                   nameserver: nextProps.network.nameserver ,
                   ntpserver: nextProps.network.ntpserver ,
                   working: nextProps.working || false,
                   vlans: nextProps.vlans })
  }

  componentDidMount() {
    this.props.fetchNetwork()
  }

  // update the form elements 
  handleChange = (event) => {
    const s = this.state
    switch(event.target.id) {
      case "netmask":
        s.netmask = event.target.value
        break;
      case "gateway":
        s.gateway = event.target.value
        break;
      case "nameserver":
        s.nameserver = event.target.value
        break;
      case "ntpserver":
        s.ntpserver = event.target.value
        break;
      case "vlan":
        var newVlans = s.vlans.map( (v) => {
            v.selected = false
            if (v.name === event.target.value) {
              v.selected = true
            }
            return v
          })
        s.vlans = newVlans
        break;
      default:
        s.netmask  = s.netmask
    }
    this.forceUpdate();
  }


  clickFunc = (event) => {
    event.preventDefault();
    var network = {}
    network['netmask'] = this.state.netmask; 
    network['gateway'] = this.state.gateway;
    network['nameserver'] = this.state.nameserver;
    network['ntpserver'] = this.state.ntpserver;
    var vlan = document.getElementById("vlan").value
    this.props.updateNetwork(vlan, network) 
  }

  render() {
    return (
      <div>
        <Error error={this.props.error} />
        <NetworkList working={this.state.working} vlans={this.state.vlans} 
                    netmask={this.state.netmask} 
                    gateway={this.state.gateway} 
                    nameserver={this.state.nameserver} 
                    ntpserver={this.state.ntpserver} 
                    clickFunc={this.clickFunc} onChange={this.handleChange} />
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

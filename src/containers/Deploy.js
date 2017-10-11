import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getKUBAMIP, getKeys, deploy  } from '../actions'
import DeployPanel from '../components/panels/deploy/'

class Deploy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: this.props.keys ,
      kubam_ip: this.props.kubam_ip
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getKUBAMIP()
    this.props.getKeys()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      keys: Array.isArray(nextProps.keys) ? nextProps.keys[0] : "",
      kubam_ip: nextProps.kubam_ip,
    })
  }

  handleChange = (event) => {
    const s = this.state
    switch(event.target.id) {
      case "keys":
        s.keys = event.target.value;
        break;
      case "kubam_ip":
        s.kubam_ip = event.target.value;
        break;
      default:
      
    }
    this.forceUpdate();
  }

  deployFunc = (event) => {
    // get the ip and the key. 
    // the keys should be in an array.  Right now the interface only allows for one key. 
    this.props.deploy(this.state.kubam_ip, [this.state.keys]);
  }

  render() {
    return (
      <DeployPanel keys={this.state.keys} kubam_ip={this.state.kubam_ip} onChange={this.handleChange} deployFunc={this.deployFunc} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  keys: state.deploy.keys,
  kubam_ip: state.deploy.kubam_ip
})

const mapDispatchToProps = (dispatch)  => ({
  getKUBAMIP: () => dispatch(getKUBAMIP()),
  getKeys: () => dispatch(getKeys()),
  deploy: (kubam_ip, keys) => dispatch(deploy(kubam_ip, keys)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Deploy)

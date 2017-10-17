import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getKUBAMIP, getKeys, deploy, destroy  } from '../actions'
import DeployPanel from '../components/panels/deploy/'
import Error from '../components/Error'

class Deploy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: this.props.keys ,
      kubam_ip: this.props.kubam_ip,
      working: this.props.working,
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
      working: nextProps.working,
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

  destroyFunc = (event) => {
    this.props.destroy()
  }

  render() {
    return (
      <div>
        <Error error={this.props.error} />
        <DeployPanel working={this.state.working} keys={this.state.keys} kubam_ip={this.state.kubam_ip} onChange={this.handleChange} deployFunc={this.deployFunc} destroyFunc={this.destroyFunc}/>
      </div>
      
    )
    
  }
}

const mapStateToProps = (state, ownProps) => ({
  keys: state.deploy.keys,
  kubam_ip: state.deploy.kubam_ip,
  working: state.deploy.fetching,
  error: state.deploy.error, 
})

const mapDispatchToProps = (dispatch)  => ({
  getKUBAMIP: () => dispatch(getKUBAMIP()),
  getKeys: () => dispatch(getKeys()),
  deploy: (kubam_ip, keys) => dispatch(deploy(kubam_ip, keys)),
  destroy: () => dispatch(destroy()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Deploy)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listServers } from '../actions'
import ServerList  from '../components/panels/server/'

class Server extends Component {
  componentDidMount() {
    this.props.listServers()
  }
  render() {
    return (
      <ServerList servers={this.props.servers} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  servers: state.server.servers
})

const mapDispatchToProps = (dispatch)  => ({
  listServers: () => dispatch(listServers()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Server)

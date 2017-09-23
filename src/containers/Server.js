import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listServers, updateServers } from '../actions'
import ServerList  from '../components/panels/server/'

class Server extends Component {
  componentDidMount() {
    this.props.listServers()
  }

  clickFunc = (event, server, servers) => {
    event.preventDefault();
    // check with list of servers to see if active
    // if not make it active, if it is uncheck it. 
    for (var i = 0; i < servers.length; i ++ ) {
      if (JSON.stringify(servers[i]) === JSON.stringify(server)) {
          server.selected ? server.selected = false : server.selected = true;
          servers[i] = server
          this.props.updateServers(servers)
          return
      }
    }
  }

  render() {
    return (
      <ServerList servers={this.props.servers} clickFunc={this.clickFunc}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  servers: state.server.servers
})

const mapDispatchToProps = (dispatch)  => ({
  listServers: () => dispatch(listServers()),
  updateServers: (servers) => dispatch(updateServers(servers)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Server)

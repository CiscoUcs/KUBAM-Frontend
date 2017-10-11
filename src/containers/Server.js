import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listServers, updateServers } from '../actions'
import ServerList  from '../components/panels/server/'
import Error from '../components/Error'

class Server extends Component {
  // initial state of the components.
  constructor(props) {
    super(props);
    this.state = {
      servers : this.props.servers || [],
      hosts : this.props.hosts || []
    }
    this.updateHosts = this.updateHosts.bind(this)
    this.hostOnblur = this.hostOnblur.bind(this)
    this.incrementHost = this.incrementHost.bind(this)
    this.hostOnChange = this.hostOnChange.bind(this)
  }

  componentDidMount() {
    this.props.listServers()
  }

  // make hosts the same length as servers by incrementing or decrmenting.
  updateHosts = (servers, hosts) => {
    const selServers = servers.filter( (server, i) => (server.selected === true))
    const servlen = selServers.length
    if (hosts.length < servlen) {
      const tl = (servlen - hosts.length) 
      for (var i = 0; i < tl; i++) {
        hosts.push({"name": "", "ip": "", "os": "centos7.3", "role": ""})
      }
    }else if (servlen < hosts.length) {
      for (i = hosts.length; i > servlen; i--) {
        hosts.pop();
      }
    } 
    return hosts;
  }

  // after the list servers returns, update the state
  componentWillReceiveProps(nextProps) {
    var newHosts = nextProps.hosts 
    
    newHosts = this.updateHosts(nextProps.servers, newHosts)

    this.setState({
      servers: nextProps.servers,
      hosts: newHosts,
    })
  }

 
  // called when server is selected 
  selectServers = (event, server, servers) => {
    event.preventDefault();
    for (var i = 0; i < servers.length; i ++ ) {
      if (JSON.stringify(servers[i]) === JSON.stringify(server)) {
          server.selected ? server.selected = false : server.selected = true;
          servers[i] = server
      }
    }
    var newHosts = this.updateHosts(servers, this.state.hosts); 
    this.setState({
        servers: servers,
        hosts: newHosts
    })
  }

  incrementHost = (suffix, nextI) => {
    var nextNum = parseInt(suffix, 10) + nextI; // get the next number
    var nu = nextNum.toString(); // convert number to a string
    while ( nu.length < suffix.length) nu = "0" + nu;
    return nu;
  }

  // given an IP address,  automatically increase the IP address by k.
  bumpIP = ( ipa, k ) => {
    ipa = ipa.split(".");
    var ipnum = 0;
    for ( var i = 0; i <= 3; ++i )
    {
        ipnum = ipnum * 0x100 + 1 * ipa[i];
    }
    ipnum += k;
    for ( i = 3; i >= 0; --i )
    {
        ipa[i] = ( ipnum & 0xFF ).toString(10);
        ipnum = Math.floor( ipnum / 256 );
    }
    return ipa.join(".");
  }

  // IP addresses are auto populated based on first one.
  ipOnblur = (e, i, max) => {
    const hosts = this.state.hosts
    var el = hosts[i].ip;
    for (var j = i+1, k = 1; j < max; j++, k++) {
      hosts[j].ip = this.bumpIP(el, k)
    }
    this.forceUpdate();
  }

  hostOnblur = (e, i, max) => {
    const hosts = this.state.hosts    
    var el = hosts[i].name
    var re = /\d+$/;
    var found = el.match(re);
    if (found === null ){
      return;
    }
    // get the suffix.  Might be 1 or 001.
    var startNum = found[0];
    for (var j = i+1, k = 1; j < max; j++, k++) {
      hosts[j].name = el.replace(startNum, this.incrementHost(startNum, k))
    }
    this.forceUpdate()
  }

  // change the value of the host name. 
  updateHostName = (e) => {
    const id = e.target.id 
    const index = parseInt(id.match(/\d+/)[0], 10);
    const hosts = this.state.hosts;
    hosts[index].name = e.target.value;
    this.forceUpdate();
  }

  // change the value of the IP address
  updateIP = (e) => {
    const id = e.target.id 
    const index = parseInt(id.match(/\d+/)[0], 10);
    const hosts = this.state.hosts;
    hosts[index].ip = e.target.value;
    this.forceUpdate();

  }

  // change the OS value
  updateOS = (e) => {
    const id = e.target.id 
    const index = parseInt(id.match(/\d+/)[0], 10);
    const hosts = this.state.hosts;
    // now update it and all the ones below it.
    for (var j = index; j < hosts.length; j++) {
      hosts[j].os = e.target.value;
    }
    this.forceUpdate();
  }
  
  hostOnChange = (event) => {
    const t = event.target.id
    switch(true) {
      case /hostname/.test(t):
        return this.updateHostName(event)
      case /ip/.test(t):
        return this.updateIP(event)
      case /os/.test(t):
        return this.updateOS(event)
      default:
        break;
    }
  }

  clickFunc = (event) => {
    event.preventDefault();
    this.props.updateServers(this.state.servers, this.state.hosts);
  }

  render() {
    return (
      <div>
        <Error error={this.props.error} />
        <ServerList hosts={this.state.hosts} servers={this.state.servers} serverSelectFunc={this.selectServers} clickFunc={this.clickFunc} hostOnblur={this.hostOnblur} hostOnChange={this.hostOnChange} ipOnblur={this.ipOnblur}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  servers: state.server.servers,
  hosts: state.server.hosts,
  error: state.server.error,
})

const mapDispatchToProps = (dispatch)  => ({
  listServers: () => dispatch(listServers()),
  updateServers: (servers, hosts) => dispatch(updateServers(servers, hosts)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Server)

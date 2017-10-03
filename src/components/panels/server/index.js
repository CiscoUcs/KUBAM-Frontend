import React from 'react'

var ServerList = ({servers, clickFunc}) => (
  <div className="card-body">
     <div className="row">
      <div className="col">
        <h1 className="">UCS Server Settings</h1>
        <p className="small text-muted">Configure and select the UCS servers</p>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <hr/>
        <h4>UCS Servers</h4>
        <p className="small text-muted">Select the UCS servers that will be deployed.</p>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <div className="scrolling-list">
        <h4 className="text-muted">Blade Servers </h4>
        <ul className="list-group" > 
          { servers.filter( (server, i) => ( server.type === "blade")).map( (server, i) => 
                server.selected ? 
                <li className="list-group-item list-group-item-action active" key={i} onClick={(e)=> clickFunc(e, server, servers)}>
                  Chassis: {server.chassis_id} Slot: {server.slot}
                  <br/>
                  {server.model}
                </li>
                :
                <li className="list-group-item list-group-item-action" key={i} onClick={(e)=> clickFunc(e, server, servers)}>
                  Chassis: {server.chassis_id} Slot: {server.slot}
                  <br/>
                  {server.model}
                </li>
              )
          }
        </ul>
        <h4 className="text-muted">Rack Servers </h4>
        <ul className="list-group"> 
          { servers.filter( (server, i) => (server.type === "rack")).map( (server, i) => 
                server.selected ? 
                <li className="list-group-item list-group-item-action active" key={i} onClick={(e) => clickFunc(e, server, servers)}>
                  Rack Unit: {server.rack_id}
                  <br/>
                  {server.model}
                </li>
                :
                <li className="list-group-item list-group-item-action" key={i} onClick={(e) => clickFunc(e, server, servers)}>
                  Rack Unit: {server.rack_id}
                  <br/>
                  {server.model}
                </li>
              )
          }
        </ul>
        </div>
      </div>
      <div className="col">
        <h3>Selected Servers</h3>
        { servers.filter( (server, i) => (server.selected === true)).map( (server, i) => 
            server.type === "rack" ? 
            <div key={i}>Rack {server.rack_id}</div>
            :
            <div key={i}>Blade {server.chassis_id}/{server.slot}</div>
        
        )}
      </div>
      
    </div>
    <div className="row">
      <div className="col">
        <hr/>
        <h4>Host Settings</h4>
        <p className="small text-muted">Configure the host settings of the servers to be deployed.</p>
      </div>
    </div>
   <form className="form">
    { servers.filter( (server, i) => (server.selected === true)).map( (server, i) => 
    <div className="row" key={i}>
      <div className="col">
        <label htmlFor={ 'hostname[' + i + ']'} className="text-muted">hostname</label>
        <input type="text" className="form-control" id={"hostname[" + i +"]"} />
      </div>
      <div className="col">
        <label htmlFor="ip" className="text-muted">IP Address</label>
        <input type="text" className="form-control" id={"ip[" + i +"]"} />
      </div>
      <div className="col">
        <label htmlFor="os" className="text-muted">Operating System</label>
        <select className="custom-select form-control">
          <option value="centos7.3" id={"os["+i+"]"} defaultValue>CentOS 7.3</option>
          <option value="rhel7.3" id={"os["+i+"]"}>RedHat 7.3</option>
          <option value="esxi6.0" id={"os["+i+"]"}>ESXi 6.0</option>
          <option value="esxi6.5" id={"os["+i+"]"}>ESXi 6.5</option>
        </select>
      </div>
    </div>
    )}
    </form>
    <div className="row">
      <div className="col text-right">
        <br/>
        <hr/>
        <button onClick={(e) => clickFunc(e, "")} className="btn btn-primary">Next</button>
      </div>
    </div>
  </div>
);

export default ServerList

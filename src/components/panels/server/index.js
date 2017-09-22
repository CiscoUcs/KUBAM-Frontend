import React from 'react'

var ServerList = ({servers, clickFunc}) => (
  <div className="card-body">
    <div className="row">
      <div className="col"></div>
      <div className="col align-self-center text-center">
        <h3 className="lead">UCS Servers</h3>
        <p></p>
        <h3>Blade Servers </h3>
        <ul className="list-group" > 
          { servers.filter( (server, i) => ( server.type === "blade")).map( (server, i) => 
                server.selected ? 
                <li className="list-group-item list-group-item-action active" key={i} onClick={(e)=> clickFunc(e, i, servers)}>
                  Chassis: {server.chassis_id} Slot: {server.slot}
                  <br/>
                  {server.model}
                </li>
                :
                <li className="list-group-item list-group-item-action" key={i} onClick={(e)=> clickFunc(e, i, servers)}>
                  Chassis: {server.chassis_id} Slot: {server.slot}
                  <br/>
                  {server.model}
                </li>
              )
          }
        </ul>
        <p></p>
        <h3>Rack Servers </h3>
        <ul className="list-group"> 
          { servers.filter( (server, i) => (server.type === "rack")).map( (server, i) => 
                server.selected ? 
                <li className="list-group-item list-group-item-action active" key={i} onClick={(e) => clickFunc(e, i, servers)}>
                  Rack Unit: {server.rack_id}
                  <br/>
                  {server.model}
                </li>
                :
                <li className="list-group-item list-group-item-action" key={i} onClick={(e) => clickFunc(e, i, servers)}>
                  Rack Unit: {server.rack_id}
                  <br/>
                  {server.model}
                </li>
              )
          }
        </ul>
      </div>
      <div className="col"></div>
    </div>
  </div>
);

export default ServerList

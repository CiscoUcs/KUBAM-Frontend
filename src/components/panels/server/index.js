import React from 'react'

var ServerList = ({servers}) => (
  <div className="card-body">
    <div className="row">
      <div className="col"></div>
      <div className="col align-self-center text-center">
        <h3 className="lead">UCS Servers</h3>
        <p></p>
        <ul className="list-group"> 
        {servers.map( (server, i) => 
              server.selected ? 
              <li className="list-group-item active" key={i}>{server.model}</li>
              :
              <li className="list-group-item" key={i}>{server.model}</li>
          )
        }
        </ul>
      </div>
      <div className="col"></div>
    </div>
  </div>
);

export default ServerList

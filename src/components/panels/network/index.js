import React from 'react'

var NetworkList = ({vlans, clickFunc}) => (
  
  <div className="card-body">
    <div className="row">
      <div className="col"></div>
      <div className="col align-self-center">
        <h3 className="lead text-center">UCS Network</h3>
        <p></p>
        <p className="text-center"><small>Please select the VLAN for the installation</small></p>
        <p></p>
        <ul className="list-group"> 
        {vlans.map( (vlan, i) => 
              vlan.selected ? 
              <li className="list-group-item active" key={i} >{vlan.name} {vlan.id}</li>
              :
              <li className="list-group-item list-group-item-action" onClick={(e) => clickFunc(e, vlan.name)} key={i}>{vlan.name} {vlan.id}</li>
          )
        }
        </ul>
      </div>
      <div className="col"></div>
    </div>
  </div>
);

export default NetworkList


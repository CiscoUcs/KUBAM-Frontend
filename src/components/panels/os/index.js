import React from 'react'

var OSList = ({osList}) => (
  
  <div className="card-body">
    <div className="row">
      <div className="col"></div>
      <div className="col align-self-center">
        <h3 className="lead text-center">ISO Images</h3>
        <p></p>
        <p className="text-center"><small></small></p>
        <p></p>
        <ul className="list-group"> 
        { osList.map( (os, i) => 
              <li className="list-group-item " key={i}> {os} </li>
          )
        }
        </ul>
      </div>
      <div className="col"></div>
    </div>
  </div>
);

export default OSList


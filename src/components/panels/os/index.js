import React from 'react'

var OSList = ({osList}) => (
  
  <div className="card-body">
    <div className="row">
      <div className="col">
        <h1 className="">Operating Systems</h1>
        <p className="small text-muted">Prepare Operating Systems for UCS deployment. </p>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <hr/>
        <h4>ISO Images</h4>
        <p className="small text-muted">
          The ISO images below are what have been mounted to the kubam server.  Please make sure the raw Operating System ISO for the desired operating system is here. 
        </p>
        <p></p>
        <ul className="list-group"> 
        { osList.map( (os, i) => 
              <li className="list-group-item " key={i}> {os} </li>
          )
        }
        </ul>
      </div>
    </div>
  </div>
);

export default OSList


import React from 'react'

var OSList = ({working, isoMap, isoMapSelect }) => (
  
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
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#osModal">
          Map ISO
        </button>
      </div>
    </div>
    { isoMap.length === 0 ? <div></div> : 
      <div className="row">
        <div className="col">
          <hr/>
          <h4>Currently Mapped ISO Images</h4>
          <p className="small text-muted">These are ISO images that have been mapped to an operating system.  Once this is completed you should generate boot images</p>
          <ul className="list-group">
          {isoMap.map( (iso, i) => 
            <li className="list-group-item pointer" key={i} data-target="#delModal" data-toggle="modal" onClick={(e) => isoMapSelect(e, iso)}> 
              <b><span className="text-primary">{iso.os} </span> </b>
              {iso.file.replace("/kubam/", "")}</li>)
          }
          </ul>
        </div>
      </div>
    } 
  </div>
);

export default OSList


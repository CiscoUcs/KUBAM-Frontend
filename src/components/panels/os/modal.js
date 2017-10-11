import React from 'react'

var OSModal = ({selectedISO, osList, isoSelect, isoOsSelect, modalClose}) => (
  <div className="modal fade" id="osModal" tabIndex="-1" role="dialog" aria-labelledby="osModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
    {selectedISO === "" ?
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="osModalLabel">Map ISO image to OS</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={modalClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p className="small text-muted">Select an ISO Image</p>
          <div className="scrolling-list">
            <ul className="list-group"> 
              { osList.map( (os, i) => 
                    <li className="list-group-item pointer" key={i} onClick={(e) => isoSelect(e, os)}> {os} </li>
                )
              }
            </ul>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={modalClose}>Close</button>
        </div>
      </div>

        : 

      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="osModalLabel">Map ISO image to OS</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={modalClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <h4>{selectedISO}</h4>
          <p className="small text-muted">Map this OS</p>
          <select className="custom-select" id="isoMap">
            <option value="centos7.3">CentOS 7.3</option>
            <option value="rh7.3" >RedHat 7.3</option>
            <option value="esxi6.0">ESXi 6.0</option>
            <option value="esxi6.5">ESXi 6.5</option>
          </select>
          <p></p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={modalClose}>Close</button>
          <button onClick={(e) => isoOsSelect(e)} className="btn btn-primary" data-dismiss="modal">Update</button>
        </div>
      </div>
    }
    </div>
  </div>
);

export default OSModal


import React from 'react'

var OSModal = ({catalog, selectedISO, osList, isoSelect, isoOsSelect, modalClose}) => (
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
            { Object.keys(catalog).map( (os) => 
              <option key={os} value={os} >{os}</option>
            )}
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


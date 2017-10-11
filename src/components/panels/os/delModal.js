import React from 'react'

var DelModal = ({selectedOS, selectedISO, isoOsDelete, modalClose}) => (
  <div className="modal fade" id="delModal" tabIndex="-1" role="dialog" aria-labelledby="delModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="osModalLabel">Change ISO / OS mapping</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={(e) => modalClose(e)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <b><span className="text-primary">{selectedOS} </span> </b>
          {selectedISO.replace("/kubam/", "")}

          {/* <p className="small text-muted">Map this OS</p>
          <select className="custom-select" id="isoMap" value={selectedOS} >
            <option value="centos7.3">CentOS 7.3</option>
            <option value="rh7.3" >RedHat 7.3</option>
            <option value="esxi6.0">ESXi 6.0</option>
            <option value="esxi6.5">ESXi 6.5</option>
          </select>
          <p></p> */}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={(e) => modalClose(e)}>Close</button>
          <button onClick={(e) => isoOsDelete(e)} className="btn btn-danger" data-dismiss="modal">Delete</button>
        </div>
      </div>
    </div>
  </div>
);

export default DelModal


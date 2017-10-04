import React from 'react'


var NetworkList = ({vlans, network, clickFunc}) => (
  
  <div className="card-body">
    <div className="row">
      <div className="col">
        <h1 className="">UCS Network Settings</h1>
        <p className="small text-muted">Configure the network settings for the UCS servers</p>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <hr/>
        <h4>UCS VLAN</h4>
        <p className="small text-muted">Select the VLAN the servers will boot from.  This VLAN should be able to reach the KUBAM server</p>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <select className="custom-select" id="vlan">
          {vlans.map( (vlan, i) => 
                vlan.selected ? 
                <option value={vlan.name} key={i} defaultValue>{vlan.name} {vlan.id}</option>
                :
                <option value={vlan.name} key={i}>{vlan.name} {vlan.id}</option>
            )
          }
        </select>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <hr/>
        <h4>Operating System Network Parameters</h4>
        <p className="small text-muted">Enter the values that will be used by the operating system for the automated install.</p>
        <br/>
      </div>
    </div>
    <div className="row">
      <div className="col">
      <form className="form">
        <div className="form-group row">
          <label htmlFor="netmask" className="col-sm-2 col-form-label text-right">Netmask</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" id="netmask" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="router" className="col-sm-2 col-form-label text-right">Router</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" id="router" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="nameserver" className="col-sm-2 col-form-label text-right">Nameserver</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" id="nameserver" />
          </div>
        </div>
      </form>
      </div>
    </div>
    <div className="row">
      <div className="col text-right">
        <br/>
        <hr/>
        <button onClick={(e) => clickFunc(e, "")} className="btn btn-primary">Next</button>
      </div>
    </div>
  </div>
);

export default NetworkList


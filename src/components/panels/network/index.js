import React from 'react'

var defValue = (vlans) => {
  var selected = vlans.find( (v) => (v.selected === true))
  if (typeof selected !== 'undefined') {
    selected =  selected.name
  }
  return selected
}

var NetworkList = ({working, vlans, network, clickFunc, onChange}) => (
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
        <select className="custom-select" id="vlan" value={ defValue(vlans)} onChange={onChange}>
          {vlans.map( (vlan, i) => 
                <option value={vlan.name} key={i} >{vlan.name} {vlan.id}</option>
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
            <input type="text" onChange={onChange} className="form-control" id="netmask" value={network.netmask} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="router" className="col-sm-2 col-form-label text-right">Router</label>
          <div className="col-sm-6">
            <input type="text" onChange={onChange} className="form-control" id="gateway" value={network.gateway}/>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="nameserver" className="col-sm-2 col-form-label text-right">Nameserver</label>
          <div className="col-sm-6">
            <input type="text" onChange={onChange} className="form-control" id="nameserver" value={network.nameserver}></input>
          </div>
        </div>
      </form>
      </div>
    </div>
    <div className="row">
      <div className="col text-right">
        <br/>
        <hr/>
        { working ? 
          <button onClick={(e) => clickFunc(e, "")} className="btn btn-primary" type="button" disabled>
            <i className="fa fa-cog fa-spin">  </i>  Updating</button>
          :
          <button onClick={(e) => clickFunc(e, "")} className="btn btn-primary" type="button">Update</button>
          }
      </div>
    </div>
  </div>
);

export default NetworkList


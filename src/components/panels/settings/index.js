import React from 'react'

var SettingsPanel = ({working, keys, kubam_ip, proxy, onChange, updateSettingsFunc}) => (

  <div className="card-body">
    <div className="row">
      <div className="col">
        <h1 className="">Settings</h1>
        <p className="small text-muted">Finalize the settings to for the deployment.</p>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <hr/>
        <h4>Finalize Settings</h4>
        <p className="small text-muted">Please enter the IP address of the KUBAM server.  This is probably the same IP address as the one in the browser window. </p>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <form className="form">
          <div className="form-group row">
            <label htmlFor="kubam_ip" className="col-sm-2 col-form-label">KUBAM IP address</label>
            <div className="col-sm-6">
              <input type="text" onChange={onChange} className="form-control" id="kubam_ip" value={kubam_ip} />
            </div>
          </div>
        </form>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <p className="small text-muted">Please enter a public key so you can log into the servers after they are installed. </p>
        <form className="form">
          <div className="form-group row">
            <label htmlFor="key" className="col-sm-2 col-form-label">Public Key</label>
            <div className="col-sm-6">
              <textarea type="text" rows="10" onChange={onChange} className="form-control" id="keys" value={keys} />
            </div>
          </div>
        </form>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <p className="small text-muted">Are you behind a firewall?  The installation needs access to the internet.  
          Enter a proxy server here if you need one, otherwise leave it blank.  The form should be http://my.proxy.com:80 </p>
        <form className="form">
          <div className="form-group row">
            <label htmlFor="proxy" className="col-sm-2 col-form-label">Proxy Server</label>
            <div className="col-sm-6">
              <input type="text" onChange={onChange} className="form-control" id="proxy" value={proxy} placeholder="http://my.proxy.com:80" />
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
          <button onClick={(e) => updateSettingsFunc(e)} className="btn btn-primary" disabled>
            <i className="fa fa-cog fa-spin" > </i> Updating</button>
          :
          <button onClick={(e) => updateSettingsFunc(e)} className="btn btn-primary">Update</button>
        }
      </div>
    </div>
  </div>
);

export default SettingsPanel


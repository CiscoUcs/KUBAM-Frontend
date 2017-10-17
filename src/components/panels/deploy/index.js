import React from 'react'

var DeployPanel = ({working, keys, kubam_ip, onChange, makeBootFunc, deployFunc, destroyFunc}) => (

  <div className="card-body">
    <div className="row">
      <div className="col">
        <h1 className="">Deploy</h1>
        <p className="small text-muted">Deploy OS images and UCS servers.</p>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <hr/>
        <h4>Make Boot Images</h4>
        <p className="small text-muted">Boot images are required for the servers to deploy.  These images are placed on the KUBAM server and are accessed by the servers when they install.  Once all required parameters in steps 1-5 are complete, make the boot images by pressing the big blue button below.  </p>
      </div>
    </div>
    <div className="row">
      <div className="col text-center">
        { working ? 
          <button onClick={(e) => makeBootFunc(e)} className="btn btn-lg btn-primary" disabled>
            <i className="fa fa-cog fa-spin"></i> Working</button>
          :
          <button onClick={(e) => makeBootFunc(e)} className="btn btn-lg btn-primary">Make Boot Images</button>
        }
      </div>
    </div>
    <div className="row">
      <div className="col">
        <hr/>
        <h4>Deploy UCS Servers</h4>
        <p className="small text-muted">After the boot images are created we can now deploy UCS.  Pressing the big blue button below will create service profiles and resources on the UCS domain.  Once this is done you will see all the changes on the UCS system.  </p>
      </div>
    </div>
    <div className="row">
      <div className="col text-center">
        { working ? 
        <button onClick={(e) => deployFunc(e)} className="btn btn-lg btn-primary" disabled>
          <i className="fa fa-cog fa-spin"></i> Working</button>
        :
        <button onClick={(e) => deployFunc(e)} className="btn btn-lg btn-primary">Deploy</button>
        }
      </div>
    </div>
    <div className="row">
      <div className="col">
        <hr/>
        <h4>Remove UCS Servers</h4>
        <p className="small text-muted">KUBAM comes with a self destruct button.  All the resources (including the servers!) can be wiped out by pressing the button below.  If your machines are running in production, you had better be sure this is what you want to do. </p>
      </div>
    </div>
    <div className="row">
      <div className="col text-center">
        <div className="alert alert-danger">
          <div className="small text-red">
            Warning: Pressing the button below will delete the entire cluster from UCS.  There is no going back.
          </div>
          <p></p>
          { working ? 
            <button onClick={(e) => destroyFunc(e)} className="btn btn-lg btn-danger" disabled>
            <i className="fa fa-cog fa-spin"></i>  Working</button>
            :
            <button onClick={(e) => destroyFunc(e)} className="btn btn-lg btn-danger">Destroy</button>
          }
        </div>
      </div>
    </div>
  </div>
);

export default DeployPanel


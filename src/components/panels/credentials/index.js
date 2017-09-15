import React from 'react'

var Login = () => (

  <div className="card-body">
    <div className="row">
      <div className="col"></div>
      <div className="col align-self-center text-center">
        <h3 className="lead">UCS LOGIN</h3>
        <small className="text-muted">Please enter credentials to connect KUBAM to your UCS</small>
        <form>
          <div className="form-row align-items-center">
            <div className="input-group">
              <div className="input-group-addon">
                <i className="fa fa-user" aria-hidden="true"></i>
              </div>
              <input type="user" className="form-control" id="inlineFormInputGroup" aria-describedby="userHelp" placeholder="USERNAME"/>
            </div>
          </div>
          <p></p>
          <div className="form-row align-items-center">
            <div className="input-group">
              <div className="input-group-addon">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </div>
              <input type="password" className="form-control" id="password" placeholder="PASSWORD"/>
            </div>
          </div>
          <p></p>
          <div className="form-row align-items-center">
            <div className="input-group">
              <div className="input-group-addon">
                <i className="fa fa-server" aria-hidden="true"></i>
              </div>
              <input type="server" className="form-control" id="server" placeholder="UCS MANAGER (e.g.: 192.168.1.100)"/>
            </div>
          </div>
          <p></p>
          <button type="submit" className="btn btn-primary">Login</button>
        </form> 
      </div>
      <div className="col"></div>
    </div>
  </div>
);

export default Login


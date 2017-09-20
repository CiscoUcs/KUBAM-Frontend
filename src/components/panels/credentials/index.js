import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, credData}) => {
  console.log(credData)
  if (credData.isLoginPending === true) {
    return (
      <div className="card-body">
        <div className="row">
          <div className="col"></div>
          <div className="col align-self-center text-center">
            <h1 className="display-1">
              <i className="fa fa-circle-o-notch fa-spin" aria-hidden="false"></i>
            </h1>
            <small>Attempting Login</small>
          </div>
          <div className="col"></div>
        </div>
      </div>
    )
  }
  if (credData.isLoggedIn === true) {
    return (
      <div className="card-body">
        <div className="row">
          <div className="col"></div>
          <div className="col align-self-center text-center">
            <h3 className="lead">Connected</h3>
            <h3 className="lead">user: { credData.user }</h3>
            <h3 className="lead">UCSM: { credData.server }</h3>
          </div>
          <div className="col"></div>
        </div>
      </div>
    )
  }
  return (
  <div className="card-body">
    <div className="row">
      <div className="col"></div>
      <div className="col align-self-center text-center">
        <h3 className="lead">UCS LOGIN</h3>
        <small className="text-muted">Please enter credentials to connect KUBAM to your UCS</small>
        <form id="creds">
          <div className="form-row align-items-center">
            <div className="input-group">
              <div className="input-group-addon">
                <i className="fa fa-user" aria-hidden="true"></i>
              </div>
              <input type="user" className="form-control" id="user" aria-describedby="userHelp" placeholder="USERNAME" />
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
          <button type="submit" className="btn btn-primary" onClick={ handleSubmit }>Login</button>
        </form> 
      </div>
      <div className="col"></div>
    </div>
  </div>
)}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm

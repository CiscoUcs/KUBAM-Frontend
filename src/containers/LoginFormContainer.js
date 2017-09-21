import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestLogin, checkLogin, logout } from '../actions'
import LoginForm  from '../components/panels/credentials/'

class LoginFormContainer extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    logoutFunc: PropTypes.func.isRequired,
    credData: PropTypes.object.isRequired,
    loginError: PropTypes.string.isRequired,
    checkLogin: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.checkLogin()
  }

  onSubmit = (event) => {
    event.preventDefault();
    const  user =  document.getElementById("user").value;
    const  password = document.getElementById("password").value;
    const  server = document.getElementById("server").value;
    this.props.login(user, password, server)
  }
  
  logOut = (event) => {
    event.preventDefault();
    this.props.logoutFunc()
  }

  render() {
    return (
      <LoginForm handleSubmit={this.onSubmit} credData={this.props.credData} error={this.props.loginError} logoutFunc={this.logOut}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  credData: state.submitCreds,
  loginError: state.submitCreds.loginError
})

const mapDispatchToProps = (dispatch)  => ({
  login: (user, password, server) => dispatch(requestLogin(user,password, server)),
  checkLogin: () => dispatch(checkLogin()),
  logoutFunc: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(LoginFormContainer)

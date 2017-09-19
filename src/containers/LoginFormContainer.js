import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestLogin } from '../actions'
import LoginForm  from '../components/panels/credentials/'

class LoginFormContainer extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    credData: PropTypes.object.isRequired
  }
  onSubmit = (event) => {
    event.preventDefault();
    const  user =  document.getElementById("user").value;
    const  password = document.getElementById("password").value;
    const  server = document.getElementById("server").value;
    this.props.login(user, password, server)
  }

  render() {
    return (
      <LoginForm handleSubmit={this.onSubmit} credData={this.props.credData}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  credData: state.submitCreds
})

const mapDispatchToProps = (dispatch)  => ({
  login: (user, password, server) => dispatch(requestLogin(user,password, server)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(LoginFormContainer)

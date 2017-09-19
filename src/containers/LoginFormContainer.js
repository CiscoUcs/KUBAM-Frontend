import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestLogin } from '../actions'
import LoginForm  from '../components/panels/credentials/'

class LoginFormContainer extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  }

  onSubmit = (event) => {
    event.preventDefault()
    const serialize = new FormData(event.target)
    const  user =  serialize.get('email')
    const  password = serialize.get('password')
    const  server = serialize.get('server')
    this.props.login(user, password, server)
  }

  render() {
    return <LoginForm handleSubmit={this.onSubmit} />
  }
}
/*
const mapStateToProps = (state) => ({
  user: fromUser.getUser(state),
})*/

const mapDispatchToProps = (dispatch)  => ({
  login: (user, password, server) => dispatch(requestLogin(user,password, server)),
})

export default connect(
  null,
  mapDispatchToProps)(LoginFormContainer)

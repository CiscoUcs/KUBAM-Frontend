import { combineReducers } from 'redux'
import todos from './todos'
import tabs from './tabs'
import login from './login'
import submitCreds from './creds'
import network from './network'
import server from './server'
import visibilityFilter from './visibilityFilter'

const kubamApp = combineReducers({
  todos,
  tabs,
  login,
  network,
  server,
  submitCreds,
  visibilityFilter
})

export default kubamApp

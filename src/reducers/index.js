import { combineReducers } from 'redux'
import todos from './todos'
import tabs from './tabs'
import login from './login'
import submitCreds from './creds'
import network from './network'
import server from './server'
import os from './os'
import visibilityFilter from './visibilityFilter'

const kubamApp = combineReducers({
  todos,
  tabs,
  login,
  network,
  server,
  os, 
  submitCreds,
  visibilityFilter
})

export default kubamApp

import { combineReducers } from 'redux'
import tabs from './tabs'
import login from './login'
import submitCreds from './creds'
import network from './network'
import server from './server'
import os from './os'
import deploy from './deploy'

const kubamApp = combineReducers({
  tabs,
  login,
  network,
  server,
  os, 
  submitCreds,
  deploy,
})

export default kubamApp

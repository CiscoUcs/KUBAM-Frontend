import { combineReducers } from 'redux'
import tabs from './tabs'
import login from './login'
import submitCreds from './creds'
import network from './network'
import server from './server'
import os from './os'
import settings from './settings'
import deploy from './deploy'

const kubamApp = combineReducers({
  tabs,
  login,
  submitCreds,
  network,
  server,
  os, 
  settings,
  deploy,
})

export default kubamApp

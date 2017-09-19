import { combineReducers } from 'redux'
import todos from './todos'
import tabs from './tabs'
import login from './login'
import submitCreds from './creds'
import visibilityFilter from './visibilityFilter'

const kubamApp = combineReducers({
  todos,
  tabs,
  login,
  submitCreds,
  visibilityFilter
})

export default kubamApp

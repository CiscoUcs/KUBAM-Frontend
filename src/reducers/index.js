import { combineReducers } from 'redux'
import todos from './todos'
import tabs from './tabs'
import visibilityFilter from './visibilityFilter'

const kubamApp = combineReducers({
  todos,
  tabs,
  visibilityFilter
})

export default kubamApp

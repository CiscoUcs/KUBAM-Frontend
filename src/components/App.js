import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import SelectTab from '../containers/SelectTab'

const App = () => (
  <div>
    <NavBar />
    <SelectTab />
    <div className="container">
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  </div>
)

export default App

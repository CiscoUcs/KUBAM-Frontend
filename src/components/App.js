import React from 'react'
import NavBar from './NavBar'
import SelectTab from '../containers/SelectTab'
import PanelController from '../containers/PanelController'

const App = () => (
  <div>
    <NavBar />
    <SelectTab />
    <div className="container">
      <PanelController />
    </div>
  </div>
)

export default App

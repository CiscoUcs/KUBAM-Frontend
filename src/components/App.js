import React from 'react'
import NavBar from './NavBar'
import SelectTab from '../containers/SelectTab'
import PanelController from '../containers/PanelController'
import Feedback from '../containers/Feedback'

const App = () => (
  <div>
    <NavBar />
    <SelectTab />
    <div className="container">
      <PanelController />
    </div>
    <Feedback />
  </div>
)

export default App

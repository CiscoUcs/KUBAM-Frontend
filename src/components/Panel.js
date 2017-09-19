import React from 'react'
//import Login from './panels/credentials/'
import LoginFormContainer from '../containers/LoginFormContainer'
import Network from './panels/network/'
import Server from './panels/server/'
import OS from './panels/os/'
import Deploy from './panels/deploy/'

var Panel = ({selected}) => {
  let p = null;
  switch (selected) {
    case "Credentials": 
      p = <LoginFormContainer />
      break;
    case "Network":
      p = <Network />
      break;
    case "Servers":
      p = <Server />
      break;
    case "OS":
      p = <OS />
      break;
    case "Deploy":
      p = <Deploy />
      break;
    default: 
      p = "Not implemented"
      break;
  }

  return(
    <div className="card main-panel">
      {p}
    </div>
  )
};

export default Panel

import React from 'react'
//import Login from './panels/credentials/'
import LoginFormContainer from '../containers/LoginFormContainer'
import Network from '../containers/Network'
import Server from '../containers/Server'
import OS from '../containers/OS'
import Deploy from '../containers/Deploy'

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

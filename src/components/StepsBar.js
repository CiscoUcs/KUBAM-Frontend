import React from 'react'
import PropTypes from 'prop-types'

var StepsBar = ({selected, onClick}) => (
        <nav className="navbar-light">
          <div className="container">
        <ul className="nav navbar-light nav-fill stepsbar">
          <li className={ selected === "Credentials" ?
                                      "nav-item active" : 
                                      "nav-item" } 
              onClick={e => {  e.preventDefault() 
                             onClick("Credentials") }}
            >
            <a className="nav-link">Credentials</a>
          </li>
          <li className={ selected === "Network" ?
                                      "nav-item active" : 
                                      "nav-item" } 

              onClick={e => {  e.preventDefault() 
                             onClick("Network") }}
            >
            <a className="nav-link ">Network</a>
          </li> 
          <li className={ selected === "Servers" ?
                                      "nav-item active" : 
                                      "nav-item" } 

              onClick={e => {  e.preventDefault() 
                             onClick("Servers") }}
            >

            <a className="nav-link" >Servers</a>
          </li>
          <li className={ selected === "OS" ?
                                      "nav-item active" : 
                                      "nav-item" } 

              onClick={e => {  e.preventDefault() 
                             onClick("OS") }}
            >


            <a className="nav-link" >Operating System</a>
          </li>
          <li className={ selected === "Deploy" ?
                                      "nav-item active" : 
                                      "nav-item" } 

              onClick={e => {  e.preventDefault() 
                             onClick("Deploy") }}
            >
            <a className="nav-link" >Deploy</a>
          </li>
        </ul>
          </div>
      </nav>
);

StepsBar.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default StepsBar

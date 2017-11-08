import React from 'react'
import PropTypes from 'prop-types'

var Feedbackfield = ({selected, onClick}) => (<div id="feedback"><a onClick="">I wish this page would...</a></div>);
Feedbackfield.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Feedbackfield

import React from 'react'
import PropTypes from 'prop-types'

var Feedbackfield = ({selected, onClick}) => (
    <div id="feedback">
        <a href="mailto:kubam-feedback@cisco.com?subject=Feedback%20for%20KUBAM%20&body=Thank%20you%20for%20your%20feedback.%20Please,%20write%20your%20comment%20below:"
        target="_top">
            <font color="black">
                    Tell us something...
            </font>
        </a>
    </div>

);
Feedbackfield.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Feedbackfield


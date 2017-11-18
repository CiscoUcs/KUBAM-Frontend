import React, {Component } from 'react'
import { connect } from 'react-redux'
import {postFeedback} from '../actions'
//import PropTypes from 'prop-types'

class Feedbackfield extends Component {
  activateLasers = () => {
    var feedbackoverlay=document.getElementById("feedbackoverlay");
    feedbackoverlay.style.display = 'inline';
    return;
  }

  deactivateLasers = () => {
    var feedbackoverlay=document.getElementById("feedbackoverlay");
    feedbackoverlay.style.display = 'none';
    return;
  }

  submitFeedback = (e) =>  {
    e.preventDefault();
    var m = document.getElementById("message")
    this.props.postFeedback(m.value)
    m.value = ""
    this.deactivateLasers()
  }

  render() {
    return (
    <div >
      <div id="feedback">
        <a onClick={this.activateLasers}>
                  Tell us something...
        </a>
      </div>

      <div id="feedbackoverlay">
        <div id="feedbackform">
          <div id="closeform">
              <a onClick={this.deactivateLasers} id="closeform"><span>&times;</span></a>
          </div>
          <form className="form">
            Tell us something...
            <br></br>
            <textarea id="message" rows="4" cols="50"/>
            <br/>
            <button onClick={(e) => this.submitFeedback(e)} className="btn btn-primary" >Submit</button>
            <br/>
            <div>
              <br />
              <small>Your feedback will be sent to our private <a href="https://ciscospark.com">spark</a> room.  
              <br/>
              Please include contact information if you want us to respond to you.</small>
            </div>
          </form>
        </div>
      </div>
    </div>
  )}
}

const mapStateToProps = (state, ownProps) => ({
  feedback: state.kubam.feedback,
})

const mapDispatchToProps = (dispatch) => ({
  postFeedback: (feedback) => dispatch(postFeedback(feedback))
})



export default connect(
  mapStateToProps,
  mapDispatchToProps)(Feedbackfield)




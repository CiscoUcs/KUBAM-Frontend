import React from 'react'
//import PropTypes from 'prop-types'

var Feedbackfield = ({selected, onClick}) => (
    <div >

        <div id="feedback">
            <a onClick={activateLasers}>
                      Tell us something...
            </a>
        </div>

        <div id="feedbackoverlay">
            <div id="feedbackform">
                <div id="closeform">
                    <a onClick={deactivateLasers} id="closeform">X</a>
                 </div>
                    <form>
                       Tell us something...
                                <br></br>
                                <textarea
                                  rows="4" cols="50">
                            </textarea>
                            <br></br>
                            <input type="submit" value="Submit">
                            </input>
                    </form>
            </div>
        </div>
     </div>
);

Feedbackfield.propTypes = {
 // onClick: PropTypes.func.isRequired,
}

export default Feedbackfield

function activateLasers(){
    var feedbackoverlay=document.getElementById("feedbackoverlay");
    feedbackoverlay.style.display = 'inline';
    return;
}

function deactivateLasers(){
    var feedbackoverlay=document.getElementById("feedbackoverlay");
    feedbackoverlay.style.display = 'none';
    return;
}



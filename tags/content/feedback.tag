<feedback> 
    <div class="container">
      <!-- <h2 class="categoryHeader">Feedback</h2> --> 
        <form>
            Feedback sent here goes to a WebEx teams room that KUBAM developers will see.  If you wish to be contacted please enter your contact details and we will try to provide support.  
            <br/>
            <br/>
            Alternatively, feel free to <a href="https://github.com/CiscoUcs/KUBaM/issues/new">open an issue on Github</a>
            <hr>
          <div class="form-group">
            <label for="feedback-contact">Contact Information (optional)</label>
            <input type="email" class="form-control" id="feedback-contact"
              aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="feedback-message">Feedback</label>
            <textarea class="form-control" id="feedback-message" rows="6"></textarea>
          </div>
          <button type="submit" class="btn btn-primary mb-2" onclick={send_feedback}>Send</button>
        </form>
    </div>
    
    <script>
        send_feedback() {            
            var instance = axios.create({
                baseURL: 'https://feedback.kubam.io/',
                timeout: 5000,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            user = document.getElementById('feedback-contact').value;
            message = document.getElementById('feedback-message').value;
            
            if(message != null) {
                out = 'Contact: ' + user || 'Not provided'
                out += ' \n '
                out += 'Message: ' + message
            
            instance.post('/v1/feedback', {
                message: out
              })
              .then(function (response) {
                var tag = document.createElement("alert");
                tag.setAttribute("type", "success");
                tag.innerHTML = 'Success: Feedback was sent to the team'
                document.getElementById('pop-box').append(tag)
                riot.mount(tag, 'alert', reduxStore); 
              })
              .catch(function (error) {
                var tag = document.createElement("alert");
                tag.setAttribute("type", "error");
                tag.innerHTML = 'Error: Feedback could not be sent';
                document.getElementById('pop-box').append(tag)
                riot.mount(tag, 'alert', reduxStore); 
              }); 
            } else {
                console.error('NO MESSAGE DEFINED!')
            }
        }
    </script>
</feedback>

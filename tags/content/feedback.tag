<feedback> 
    <div class="container>">
        <form>
            Thank you for your feedback. Your opinion is very important for us.<br>
            <hr>
            <fancy-input tag="Contact Information"
                         inputid="feedback-contact">
            </fancy-input>
            <fancy-textarea tag="Message"
                            inputid="feedback-message">
            </fancy-textarea>
            <fancy-button onclick={send_feedback}>Send</fancy-button>
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
    
    <style> 
        form{
            font-size: 14px;
            color:black;
            font-weight: 400;
            padding-top: 25px;
            padding-left: 45px;
            padding-right: 45px;
            padding-bottom: 25px;
            background-color: white;
        }
        textarea{
            vertical-align: top;
            min-width: 650px;
        }  
        select, textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            margin-top: 6px;
            margin-bottom: 16px;
            resize: vertical;
        }
        
        fancy-button{
            margin-left: -15px;
        } 
        
 
    </style>
</feedback>
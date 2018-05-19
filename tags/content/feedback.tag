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
                timeout: 1000,
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
                console.log(out)
            
            instance.post('/v1/feedback', {
                message: out
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
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

<!--
TODOs:
- try with a white background
- add sending of message to Spark
-->


<!--
PREVIOUS VERSION:
https://github.com/CiscoUcs/KUBAM-Frontend/blob/2af8ab67c5a8dd7886037de675492fd0fdeef540/src/services/kubam.js
----------------------------------------------
const kurl = "https://feedback.kubam.io"

// this is the kubam.io api 
const kubamApi = {
  postFeedback(userData) {
    return fetch(kurl + '/v1/feedback', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userData.feedback,
      }),
    })
    .then(statusHelper)
    .then(data => {
      return data
    })
    .catch( (error) => { 
      return error
    })
  },
}
----------------------------------------------
SERVER:
https://github.com/vallard/KUBAM-Feedback-Server/blob/master/main.go
----------------------------------------------
func handleFeedback(s *spark.Spark, fb Feedback, roomId string) error {
	log.Printf("Message: %s", fb.Message)
	newMessage := spark.Message{
		RoomId: roomId,
		Text:   fb.Message,
	}
	m, err := s.CreateMessage(newMessage)
	if err != nil {
		log.Printf("Unable to create message.\nM: %v\n", m)
	}
	return err
}

func main() {

	if err := envdecode.Decode(&ev); err != nil {
		log.Fatalf("Environment Decode Problem: %v\n", err)
	}
	s = spark.New(ev.SparkToken)
	mux := http.NewServeMux()
	mux.HandleFunc("/v1/feedback", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Got a request:\n  %v\n\n", r)
		if r.Method == "POST" {
			decoder := json.NewDecoder(r.Body)
			for {
				var fb Feedback
				if err := decoder.Decode(&fb); err != nil {
					log.Print(err)
					break
				}
				// do something with the message.
				//handleFeedback(s, fb, ev.SparkRoom)
				handleFeedback(s, fb, "Y2lzY29zcGFyazovL3VzL1JPT00vYzJjNDY3MDAtYzhhMS0xMWU2LThmNmEtZTlmZTYyZjkwMzU1")

			}
		}
		if r.Method == "GET" {
			fmt.Fprintf(w, "I'm alive and waiting for feedback")

		}
	})

	log.Print("Kubam Feedback is Listening on port 9999")
	log.Print("call me with: curl -X POST -d '{\"message\" : \"Kubam is awesome.\" }' localhost:9999/v1/feedback ")
	handler := cors.Default().Handler(mux)
	http.ListenAndServe(":9999", handler)
}
-->
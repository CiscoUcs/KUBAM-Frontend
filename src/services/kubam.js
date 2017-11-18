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

// thanks: https://github.com/redux-saga/redux-saga/issues/561
function statusHelper (response) {
  let json = response.json(); // there's always a body.
  if (response.status >= 200 && response.status < 300) {
    return json.then(Promise.resolve(response))
  } else {
    if (! json.error) {
      json.error = "Unable to get network settings."
    }
    return json.then(Promise.reject.bind(Promise))
  }
}

export default kubamApi

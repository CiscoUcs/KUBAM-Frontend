const url = "http://localhost/api/v1"

const networkApi = {
  list(userData) {
    return fetch(url + '/networks', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(statusHelper)
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch( (error) => { 
      return error
    })
  }
}

// thanks: https://github.com/redux-saga/redux-saga/issues/561
function statusHelper (response) {
  let json = response.json(); // there's always a body.
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    console.log("this is the total response:")
    if (! json.error) {
      json.error = "Unable to get network settings."
    }
    return json.then(Promise.reject.bind(Promise))
  }
}

export default networkApi

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
    .catch(error => error)
    .then(data => {
      //console.log(data)
      return data.vlans
    })
  }
}

// thanks: https://github.com/redux-saga/redux-saga/issues/561
function statusHelper (response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

export default networkApi

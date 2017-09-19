const url = "http://localhost/api/v1"

const sessionApi = {
  login(userData) {
    return fetch(url + '/session', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        credentials : {
          user : userData.user,
          password: userData.password,
          server : userData.server
        }
      })
    })
    .then(statusHelper)
    .then(response => response.json())
    .catch(error => error)
    .then(data => {
      console.log(data)
      return data
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

export default sessionApi

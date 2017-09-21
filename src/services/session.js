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
      return data
    })
  },
  get_login() {
    return fetch(url + '/session', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(statusHelper)
    .catch(error => error)
    .then(response => response.json())
    .then(data => {
      return data
    })
  },
  delete_login() {
    return fetch(url + '/session', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(statusHelper)
    .then(response => response.json())
    .catch(error => error)
    .then(data => {
      return data
    })
  }
}

// thanks: https://github.com/redux-saga/redux-saga/issues/561
function statusHelper (response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    var error = new Error(response.statusText || response.status)
    error.response = response
    return Promise.reject(error)
  }
}

export default sessionApi

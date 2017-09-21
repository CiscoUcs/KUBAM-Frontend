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
    .catch(error => error)
    .then(data => {
      return data
    })
  }
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

export default sessionApi

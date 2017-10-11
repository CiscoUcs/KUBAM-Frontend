import {KUBAM_API} from './api'
const url = KUBAM_API

const deployApi = {
  fetchKeys(userData) {
    return fetch(url + '/keys', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(statusHelper)
    .then(data => {
      return data
    })
    .catch( (error) => { 
      return error
    })
  },
  fetchKUBAMIP(userData) {
    return fetch(url + '/ip', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(statusHelper)
    .then(data => {
      return data
    })
    .catch( (error) => { 
      return error
    })
  },
  deploy(userData) {
    return fetch(url + '/deploy', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        kubam_ip: userData.kubam_ip,
        keys: userData.keys,
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

export default deployApi

const url = "http://localhost/api/v1"

const osApi = {
  list() {
    return fetch(url + '/isos', {
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
  listMap() {
    return fetch(url + '/isos/map', {
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
  updateISOMap(userData) {
    console.log(userData.isoMap)
    return fetch(url + '/isos/map', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        iso_map: userData.isoMap,
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
  makeISOImages(userData) {
    return fetch(url + "/isos/boot", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}),
    })
    .then(statusHelper)
    .then(data => {
      return data
    })
    .catch( error => { 
      return error
    })
  },
}

// thanks: https://github.com/redux-saga/redux-saga/issues/561
function statusHelper (response) {
  var json = response.json(); // there's always a body.
  if (response.status >= 200 && response.status < 300) {
    return json.then(Promise.resolve(response))
  } else {
    if (! json.error) {
      json.error = "Error with os fetching."
    }
    return json.then(Promise.reject.bind(Promise))
  }
}

export default osApi

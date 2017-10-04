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
    .then(data => {
      return data
    })
    .catch( (error) => { 
      return error
    })
  },
  updateVLAN(userData) {
    return fetch(url + '/networks/vlan', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vlan: userData.vlan,
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
  updateNetwork(userData) {
    console.log("updateNetwork")
    console.log(userData)
    return fetch(url + '/networks', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        vlan: userData.vlan,
        network: userData.network,
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

export default networkApi

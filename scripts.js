var sagaMiddleware = ReduxSaga.default()

if(window.location.hash.substring(1) == '') {
    route('images')
}

var defaultState = {
    isLoading: false
}

var loadingState = {
    isLoading: true
}

var reducer = function(state=defaultState, action) {
    switch(action.type) {
        case 'FLUSH':
            return Object.assign({},state,{isLoading: true})
            break;
        case 'FETCH_IN_PROGRESS':
            return Object.assign(loadingState2)
            break
        case 'FETCH_SUCCEEDED':
            top_key = Object.keys(action.data)[0]
            add_data = action.data[top_key]
            
            x = {}
            x[top_key] = add_data
            
            console.log(x)
                                    
            return Object.assign({},state,{isLoading: false},x)
            break;
        default:
            return state
    }
    return state
}

const reduxStore = Redux.createStore(
    reducer,
    Redux.applyMiddleware(sagaMiddleware)
)

var ax = axios.create({
    baseURL: 'http://10.93.234.96:8001/api/',
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

function* getIsos(action) {
    ax.get('v1/isos', {})
    .then(function (response) {
        reduxStore.dispatch({
            type: "FETCH_SUCCEEDED",
            data: {'isos': response['data']['isos']}
        })
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'getImages',
            message: error.message
        });
    });
}

function* createImgMapping(action) {    
    post_data = {
        'iso_map': [
            {'os': action['data'].name, 'file': '/kubam/' + action['data'].iso}]
    }
    console.log(post_data)
    
    ax.post('v1/isos/map', post_data)
    .then(function (response) {
        reduxStore.dispatch({
            type: 'FETCH_MAPPINGS'
        })
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'createImgMapping',
            message: error.message
        });
    });
}

function* fetchMappings(action) {
    ax.get('v1/isos/map', {})
    .then(function (response) {
        reduxStore.dispatch({
            type: "FETCH_SUCCEEDED",
            data: {'iso_map': response['data']['iso_map']}
        })
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'fetchMappings',
            message: error.message
        });
    });
}



function* getInfraComponents(action) {
    ax.get('v2/servers', {})
    .then(function (response) {
        reduxStore.dispatch({
            type: "FETCH_SUCCEEDED",
            data: {'servers': response['data']['servers']}
        })
        ax.get('v2/aci', {})
        .then(function (response) {
            aci_response = response['data']['aci']
            for(i=0;i<aci_response.length;i++) {
                aci_response[i]['type'] = 'aci';
            }
            reduxStore.dispatch({
                type: "FETCH_SUCCEEDED",
                data: {'aci': aci_response}
            })
        })
        .catch(function (error) {
            reduxStore.dispatch({
                type: "OP_FAILED",
                method: 'getInfraComponents',
                message: error.message
            });
        });
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'getInfraComponents',
            message: error.message
        });
    });
}

function* createInfraComponent(action) {
    console.log(action['data'])
    
    if (action['data']['type'] =='imc' || action['data']['type'] =='ucsm') {
        delete action['data']['aci']
        ax.post('v2/servers', action['data'])
            .then(function (response) {
                reduxStore.dispatch({
                    type: 'FETCH_INFRA'
                })
            })
            .catch(function (error) {
                reduxStore.dispatch({
                    type: "OP_FAILED",
                    method: 'createInfraComponent',
                    message: error.message
                });
        });
    }
    else {
        aci_post = {'name': action['data']['name'],
                    'credentials': action['data']['credentials'],
                    'tenant_name': action['data']['aci']['tenant_name'],
                    'vrf_name': action['data']['aci']['vrf_name'],
                    'bridge_domain': action['data']['aci']['bridge_domain']}
        ax.post('v2/aci', aci_post)
            .then(function (response) {
                reduxStore.dispatch({
                    type: 'FETCH_INFRA'
                })
            })
            .catch(function (error) {
                reduxStore.dispatch({
                    type: "OP_FAILED",
                    method: 'createInfraComponent',
                    message: error.message
                });
        });
    } 
}

function* deleteInfraComponent(action) {
    console.log(action['data'])
    
    delete_id = {"id": action['data']['id']};
    console.log(delete_id)
    
    if (action['data']['type'] =='imc' || action['data']['type'] =='ucsm') {
        ax.delete('v2/servers', {data: delete_id})
            .then(function (response) {
                console.log('Infra component deleted')
            })
            .catch(function (error) {
                reduxStore.dispatch({
                    type: "OP_FAILED",
                    method: 'deleteInfraComponent',
                    message: error.message
                });
            }); 
    }
    else {
        ax.delete('v2/aci', delete_id)
            .then(function (response) {
                console.log('Infra component deleted')
            })
            .catch(function (error) {
                reduxStore.dispatch({
                    type: "OP_FAILED",
                    method: 'deleteInfraComponent',
                    message: error.message
                });
            });
    }   
}

function* fetchNetworkGroups(action) {
    ax.get('v2/networks', {})
    .then(function (response) {
        reduxStore.dispatch({
            type: "FETCH_SUCCEEDED",
            data: response['data']
        })
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'getInfraComponents',
            message: error.message
        });
    });
}

function* createNetworkGroup(action) {
    ax.post('v2/networks', action['data'])
    .then(function (response) {
        console.log('Network Group created')
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'createNetworkGroup',
            message: error.message
        });
    });
}

function* addPublicKey(action) {
    post_data = {
        "keys": [action['data']['key']]
    }
    
    ax.post('v1/keys', action['data']['key'])
    .then(function (response) {
        console.log('Public Key added')
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'addPublicKey',
            message: error.message
        });
    });
}

function* logError(action) {
    console.error('ERROR in ' + action.method + ': ' + action.message)
}

function* watchUserRequests() {
  yield ReduxSaga.takeEvery('OP_FAILED', logError)
    
  yield ReduxSaga.takeEvery('FETCH_IMAGES', getIsos)
  yield ReduxSaga.takeEvery('FETCH_MAPPINGS', fetchMappings)
  yield ReduxSaga.takeEvery('CREATE_IMGMAPPING', createImgMapping)
    
  yield ReduxSaga.takeEvery('FETCH_INFRA', getInfraComponents)
  yield ReduxSaga.takeEvery('CREATE_CONTROLLER', createInfraComponent)
    yield ReduxSaga.takeEvery('DELETE_CONTROLLER', deleteInfraComponent)

  yield ReduxSaga.takeEvery('FETCH_NETWORKGROUPS', fetchNetworkGroups)
  yield ReduxSaga.takeEvery('CREATE_NETWORKGROUP', createNetworkGroup)
    
  yield ReduxSaga.takeEvery('ADD_PUBLICKEY', addPublicKey)
}

function* rootSaga() {
  yield ReduxSaga.effects.all([
    watchUserRequests(),
  ])
}

sagaMiddleware.run(rootSaga)

riot.mount('*', {store:reduxStore})

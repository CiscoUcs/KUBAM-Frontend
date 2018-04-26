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
            
            if(top_key =='infracomponents') {
                servers = action.data[top_key]['servers']
                var add_data = []
                for (var s in servers) {
                    add_data.push(servers[s])
                }
            } else {
                add_data = action.data[top_key]
            }
            
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
    console.log(action['data'])
    
    post_data = {
        'iso_map': [
            {'os': action['data'].name, 'file': '/kubam/' + action['data'].iso}]
    }
    ax.post('v1/isos/map', post_data)
    .then(function (response) {
        console.log('Mapping created')
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'createInfraComponent',
            message: error.message
        });
    });
}

function* fetchMappings(action) {
    ax.get('v1/isos/map', {})
    .then(function (response) {
        console.log(response['data'])
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
            data: {'infracomponents': response['data']}
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

function* createInfraComponent(action) {
    console.log(action['data'])
    ax.post('v2/servers', action['data'])
    .then(function (response) {
        console.log('a')
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'createInfraComponent',
            message: error.message
        });
    });
}

function* addPublicKey(action) {
    console.log(action['data'])
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
    
  yield ReduxSaga.takeEvery('CREATE_SRVGROUP', createInfraComponent)
    
  yield ReduxSaga.takeEvery('ADD_PUBLICKEY', addPublicKey)
}

function* rootSaga() {
  yield ReduxSaga.effects.all([
    watchUserRequests(),
  ])
}

sagaMiddleware.run(rootSaga)

riot.mount('*', {store:reduxStore})

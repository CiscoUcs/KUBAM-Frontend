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
            
            if(top_key == 'images') {
                var add_data = []
                for (var key in action.data[top_key]) {
                    add_data.push(key)
                }
            } else if(top_key =='infracomponents') {
                servers = action.data[top_key]['servers']
                var add_data = []
                for (var s in servers) {
                    add_data.push(servers[s])
                }
            }
            
            x = {}
            x[top_key] = add_data
                        
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

function* testFunction(action) {
    ax.get('v1/catalog', {})
    .then(function (response) {
        reduxStore.dispatch({
            type: "FETCH_SUCCEEDED",
            data: {'images': response['data']}
        })
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "FETCH_FAILED",
            message: e.message
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
            type: "FETCH_FAILED",
            message: e.message
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
        console.log('Error when creating the new infrastructure component.')
        console.log(error)
    });
}

function* watchUserRequests() {
  yield ReduxSaga.takeEvery('FETCH_IMAGES', testFunction)
  yield ReduxSaga.takeEvery('ADD_IMAGE', testFunction)
    
  yield ReduxSaga.takeEvery('FETCH_INFRA', getInfraComponents)
    
  yield ReduxSaga.takeEvery('CREATE_SRVGROUP', createInfraComponent)
}

function* rootSaga() {
  yield ReduxSaga.effects.all([
    watchUserRequests(),
  ])
}

sagaMiddleware.run(rootSaga)

riot.mount('*', {store:reduxStore})

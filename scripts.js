var sagaMiddleware = ReduxSaga.default()

if(window.location.hash.substring(1) == '') {
    route('dashboard')
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
            return Object.assign(loadingState)
            break;
        case 'FETCH_SUCCEEDED':
            var images = []
            for (var key in action.data) {
                images.push(key)
            }
            
            return Object.assign({},state,{isLoading: false},{'images': images})
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
    baseURL: 'http://10.93.234.96:8001/api/v1',
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

function* testFunction(action) {
    ax.get('/catalog', {})
    .then(function (response) {
        reduxStore.dispatch({
            type: "FETCH_SUCCEEDED",
            data: response['data']
        })
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "FETCH_FAILED",
            message: e.message
        });
    });
}

function* watchUserRequests() {
  yield ReduxSaga.takeEvery('FETCH_IMAGES', testFunction)
  yield ReduxSaga.takeEvery('ADD_IMAGE', testFunction)
}

function* rootSaga() {
  yield ReduxSaga.effects.all([
    watchUserRequests(),
  ])
}

sagaMiddleware.run(rootSaga)

riot.mount('*', {store:reduxStore})
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

function createAx(ip) {
    url = 'http://' + ip + ':8001/api/'
    return axios.create({
        baseURL: url,
        timeout: 1200,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

var ax = createAx(KUBAM_IP)

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
    new_mapping = {'os': action['data'].name,
                   'file': '/kubam/' + action['data'].iso
                  }
    
    ax.get('v1/isos/map', {})
    .then(function (response) {
        map = response['data']['iso_map']
        new_map = []
        for(var i=0;i<map.length;i++) {
            console.log(map[i].os)
            console.log(new_mapping.os)
            if(map[i].os != new_mapping.os) {
                new_map.push(map[i])
            }
        }
                        
        new_map.push(new_mapping)
        new_post = {'iso_map': 
            new_map
        }
        
        ax.post('v1/isos/map', new_post)
        .then(function (response) {
            var tag = document.createElement("alert");
            tag.setAttribute("type", "success");
            tag.innerHTML = 'Success: Mapping created'
            document.getElementById('pop-box').append(tag)
            riot.mount(tag, 'alert', reduxStore); 
            
            reduxStore.dispatch({
                type: 'FETCH_MAPPINGS'
            })
        })
        .catch(function (error) {
            var tag = document.createElement("alert");
            tag.setAttribute("type", "error");
            tag.innerHTML = 'Error: Could not create mapping'
            document.getElementById('pop-box').append(tag)
            riot.mount(tag, 'alert', reduxStore); 
            
            reduxStore.dispatch({
                type: "OP_FAILED",
                method: 'createImgMapping',
                message: error.message
            });
        });
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'createImgMapping',
            message: error.message
        });
    });
}

function getCatalog(action){
    ax.get('/v1/catalog')
    .then(function (response) {
        console.log(response['data'])
        reduxStore.dispatch({
        type: "FETCH_SUCCEEDED",
        data: {'catalog': response['data']}
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

function* deleteImgMapping(action) {
    remove = action['data']['os']
    
    ax.get('v1/isos/map', {})
    .then(function (response) {
        map = response['data']['iso_map']
        
        r_id = undefined
        for(i=0;i<map.length;i++) {
            if(map[i]['os'] == remove) {
                r_id = i
            }
        }
        
        map.splice(r_id,1)
                
        new_post = {'iso_map': 
            map
        }
        
        ax.post('v1/isos/map', new_post)
        .then(function (response) {
            var tag = document.createElement("alert");
            tag.setAttribute("type", "success");
            tag.innerHTML = 'Success: Mapping deleted'
            document.getElementById('pop-box').append(tag)
            riot.mount(tag, 'alert', reduxStore); 
            
            reduxStore.dispatch({
                type: 'FETCH_MAPPINGS'
            })
        })
        .catch(function (error) {
            var tag = document.createElement("alert");
            tag.setAttribute("type", "error");
            tag.innerHTML = 'Error: Could not delete mapping'
            document.getElementById('pop-box').append(tag)
            riot.mount(tag, 'alert', reduxStore); 
            
            reduxStore.dispatch({
                type: "OP_FAILED",
                method: 'createImgMapping',
                message: error.message
            });
        });
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'createImgMapping',
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
    if (action['data']['type'] =='imc' || action['data']['type'] =='ucsm') {
        delete action['data']['aci']
        ax.post('v2/servers', action['data'])
            .then(function (response) {
                var tag = document.createElement("alert");
                tag.setAttribute("type", "success");
                tag.innerHTML = 'Success: UCS component created'
                document.getElementById('pop-box').append(tag)
                riot.mount(tag, 'alert', reduxStore); 
            
                reduxStore.dispatch({
                    type: 'FETCH_INFRA'
                })
            })
            .catch(function (error) {
                var tag = document.createElement("alert");
                tag.setAttribute("type", "error");
                tag.innerHTML = 'Error: Could not delete UCS component'
                document.getElementById('pop-box').append(tag)
                riot.mount(tag, 'alert', reduxStore); 
            
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
                var tag = document.createElement("alert");
                tag.setAttribute("type", "success");
                tag.innerHTML = 'Success: ACI Fabric created'
                document.getElementById('pop-box').append(tag)
                riot.mount(tag, 'alert', reduxStore); 
            
                reduxStore.dispatch({
                    type: 'FETCH_INFRA'
                })
            })
            .catch(function (error) {
                var tag = document.createElement("alert");
                tag.setAttribute("type", "error");
                tag.innerHTML = 'Error: Could not create ACI Fabric'
                document.getElementById('pop-box').append(tag)
                riot.mount(tag, 'alert', reduxStore); 
            
                reduxStore.dispatch({
                    type: "OP_FAILED",
                    method: 'createInfraComponent',
                    message: error.message
                });
        });
    } 
}

function* deleteInfraComponent(action) {    
    delete_id = {"name": action['data']['name']};
    
    if (action['data']['type'] =='imc' || action['data']['type'] =='ucsm') {
        ax.delete('v2/servers', {data: delete_id})
            .then(function (response) {
                var tag = document.createElement("alert");
                tag.setAttribute("type", "success");
                tag.innerHTML = 'Success: Component deleted'
                document.getElementById('pop-box').append(tag)
                riot.mount(tag, 'alert', reduxStore); 
            })
            .catch(function (error) {
                var tag = document.createElement("alert");
                tag.setAttribute("type", "error");
                tag.innerHTML = 'Success: Could not delete component'
                document.getElementById('pop-box').append(tag)
                riot.mount(tag, 'alert', reduxStore); 
            
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
                var tag = document.createElement("alert");
                tag.setAttribute("type", "success");
                tag.innerHTML = 'Success: ACI Fabric deleted'
                document.getElementById('pop-box').append(tag)
                riot.mount(tag, 'alert', reduxStore); 
            
                console.log('Infra component deleted')
            })
            .catch(function (error) {
                var tag = document.createElement("alert");
                tag.setAttribute("type", "error");
                tag.innerHTML = 'Error: ACI Fabric could not be deleted'
                document.getElementById('pop-box').append(tag)
                riot.mount(tag, 'alert', reduxStore); 
            
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
        var tag = document.createElement("alert");
        tag.setAttribute("type", "success");
        tag.innerHTML = 'Success: Network group created'
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore); 
    })
    .catch(function (error) {
        var tag = document.createElement("alert");
        tag.setAttribute("type", "error");
        tag.innerHTML = 'Error: Could not create Network group'
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore); 
        
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'createNetworkGroup',
            message: error.message
        });
    });
}

function* deleteNetworkGroup(action) {
    ax.delete('v2/networks', {"name": action['data']['name'] })
    .then(function (response) {
        var tag = document.createElement("alert");
        tag.setAttribute("type", "success");
        tag.innerHTML = 'Success: Network deleted'
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore); 
            
        reduxStore.dispatch({
            type: 'FETCH_NETWORKGROUPS'
        })
    })
    .catch(function (error) {
        var tag = document.createElement("alert");
        tag.setAttribute("type", "error");
        tag.innerHTML = 'Error: Could not delete network'
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore); 

        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'deleteKey',
            message: error.message
        });
    }); 
}

function* getKeys(action) {
    ax.get('v1/keys', {})
    .then(function (response) {
        reduxStore.dispatch({
            type: "FETCH_SUCCEEDED",
            data: response['data']
        })
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'fetchIP',
            message: error.message
        });
    });
}

function* addPublicKey(action) {
    ax.get('v1/keys', {})
    .then(function (response) {
        post_data = response['data']
        post_data['keys'].push(action['data']['key'])

        ax.post('v1/keys', post_data )
        .then(function (response) {
            var tag = document.createElement("alert");
            tag.setAttribute("type", "success");
            tag.innerHTML = 'Success: Public key added'
            document.getElementById('pop-box').append(tag)
            riot.mount(tag, 'alert', reduxStore); 
            
            reduxStore.dispatch({
                type: 'FETCH_KEYS'
            })
        })
        .catch(function (error) {
            var tag = document.createElement("alert");
            tag.setAttribute("type", "error");
            tag.innerHTML = 'Error: Public key could not be added'
            document.getElementById('pop-box').append(tag)
            riot.mount(tag, 'alert', reduxStore); 

            reduxStore.dispatch({
                type: "OP_FAILED",
                method: 'addPublicKey',
                message: error.message
            });
        });
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'addPublicKey',
            message: error.message
        });
    });
}

function* editPublicKey(action) {
    ax.get('v1/keys', {})
    .then(function (response) {
        post_data = response['data']['keys']
        
        replace_val = undefined
        for(var i=0;i<post_data.length;i++) {
            if(post_data[i] == action.data['old_key']) {
                replace_val = i
            }
        }
        
        if(replace_val != undefined) {
            post_data[replace_val] = action.data['new_key']
        }
        
        console.log(post_data)

        ax.post('v1/keys', {'keys': post_data})
        .then(function (response) {
            var tag = document.createElement("alert");
            tag.setAttribute("type", "success");
            tag.innerHTML = 'Success: Public key modified'
            document.getElementById('pop-box').append(tag)
            riot.mount(tag, 'alert', reduxStore); 
            
            reduxStore.dispatch({
                type: 'FETCH_KEYS'
            })
        })
        .catch(function (error) {
            var tag = document.createElement("alert");
            tag.setAttribute("type", "error");
            tag.innerHTML = 'Error: Public key could not be modified'
            document.getElementById('pop-box').append(tag)
            riot.mount(tag, 'alert', reduxStore); 

            reduxStore.dispatch({
                type: "OP_FAILED",
                method: 'addPublicKey',
                message: error.message
            });
        });
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'addPublicKey',
            message: error.message
        });
    });
}

function* deleteKey(action) {
    remove = action['data']['id']
 
    ax.get('v1/keys', {})
    .then(function (response) {
        keys = response['data']['keys']
        
        k_id = undefined
        for(i=0;i<keys.length;i++) {
            if(keys[i] == remove) {
                k_id = i
            }
        }
        
        keys.splice(k_id,1)
        new_keys = {
            keys: keys
        }
        
        ax.post('v1/keys', new_keys)
        .then(function (response) {
            var tag = document.createElement("alert");
            tag.setAttribute("type", "success");
            tag.innerHTML = 'Success: Key deleted'
            document.getElementById('pop-box').append(tag)
            riot.mount(tag, 'alert', reduxStore); 
            
            reduxStore.dispatch({
                type: 'FETCH_KEYS'
            })
        })
        .catch(function (error) {
            var tag = document.createElement("alert");
            tag.setAttribute("type", "error");
            tag.innerHTML = 'Error: Could not delete key'
            document.getElementById('pop-box').append(tag)
            riot.mount(tag, 'alert', reduxStore); 
            
            reduxStore.dispatch({
                type: "OP_FAILED",
                method: 'deleteKey',
                message: error.message
            });
        });
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'deleteKey',
            message: error.message
        });
    });    
}

function* fetchIP(action) {
    ax.get('v1/ip', {})
    .then(function (response) {
        reduxStore.dispatch({
            type: "FETCH_SUCCEEDED",
            data: response['data']
        })
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'fetchIP',
            message: error.message
        });
    });
}

function* updateIP(action) {
    new_ip = {kubam_ip: action['data']['kubam_ip']}
        
    ax.post('v1/ip', new_ip)
    .then(function (response) {
        var tag = document.createElement("alert");
        tag.setAttribute("type", "success");
        tag.innerHTML = 'Success: IP was updated'
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore);
        
        reduxStore.dispatch({
            type: 'FETCH_IP'
        })
        
        reduxStore.dispatch({
            type: 'FETCH_KEYS'
        })
    })
    .catch(function (error) {
        var tag = document.createElement("alert");
        tag.setAttribute("type", "error");
        tag.innerHTML = 'Error: IP could not be updated'
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore); 
        
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'updateIP',
            message: error.message
        });
    });
}

function* addHost(action) {
    console.log(action['data'])
    hosts = reduxStore.getState().hosts
    hosts.push({ip:'1.1.1.1',
                name: 'undefined',
                network_group: '',
                os: '',
                role: '',
                server_group: 'xxxx'
               })
    console.log(hosts)
    
    ax.post('v2/hosts', hosts)
    .then(function(response){
        var tag = document.createElement("alert");
        tag.setAttribute("type", "success");
        tag.innerHTML = 'Success: Host was added correctly'
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore); 
        })
    .catch(function(error){
        var tag = document.createElement("alert");
        tag.setAttribute("type", "error");
        tag.innerHTML = 'Error: Host could not be added'
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore); 
        
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'addHost',
            message: error.message
        });
    });

}

function* getHost(action){
    ax.get('v2/hosts')
    .then(function(response) {
        reduxStore.dispatch({
            type: "FETCH_SUCCEEDED",
            data: response['data']
        })
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'deleteKey',
            message: error.message
        });
    });
}

function* deleteHost(action){
    remove = {"name": action['data'] }
    ax.delete('v2/hosts', remove)
    .then(function (response) {
        var tag = document.createElement("alert");
        tag.setAttribute("type", "success");
        tag.innerHTML = 'Success: Host deleted'
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore); 
            
        reduxStore.dispatch({
            type: "FETCH_HOSTS"
        })
    })
    .catch(function(error) {
        var tag = document.createElement("alert");
        tag.setAttribute("type", "error");
        tag.innerHTML = 'Error: Could not delete Host'
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore); 

        reduxStore.dispatch({
            type: "OP_FAILED",
            method: 'deleteKey',
            message: error.message
        });
    }); 
}

function* logError(action) {
    console.error('ERROR in ' + action.method + ': ' + action.message)
}

function* watchUserRequests() {
  yield ReduxSaga.takeEvery('OP_FAILED', logError)
  
  yield ReduxSaga.takeEvery('ADD_HOST', addHost)
  yield ReduxSaga.takeEvery('FETCH_HOSTS', getHost)
  yield ReduxSaga.takeEvery('DELETE_HOST', deleteHost)
    
  yield ReduxSaga.takeEvery('FETCH_IMAGES', getIsos)
  yield ReduxSaga.takeEvery('FETCH_CATALOG', getCatalog)
  yield ReduxSaga.takeEvery('FETCH_MAPPINGS', fetchMappings)
  yield ReduxSaga.takeEvery('CREATE_IMGMAPPING', createImgMapping)
  yield ReduxSaga.takeEvery('DELETE_MAPPING', deleteImgMapping)
    
  yield ReduxSaga.takeEvery('FETCH_IP', fetchIP)
  yield ReduxSaga.takeEvery('UPDATE_IP', updateIP)
    
  yield ReduxSaga.takeEvery('FETCH_INFRA', getInfraComponents)
  yield ReduxSaga.takeEvery('CREATE_CONTROLLER', createInfraComponent)
  yield ReduxSaga.takeEvery('DELETE_CONTROLLER', deleteInfraComponent)

  yield ReduxSaga.takeEvery('FETCH_NETWORKGROUPS', fetchNetworkGroups)
  yield ReduxSaga.takeEvery('CREATE_NETWORKGROUP', createNetworkGroup)
  yield ReduxSaga.takeEvery('DELETE_NETWORK', deleteNetworkGroup)
    
  yield ReduxSaga.takeEvery('FETCH_KEYS', getKeys)
  yield ReduxSaga.takeEvery('ADD_PUBLICKEY', addPublicKey)
  yield ReduxSaga.takeEvery('EDIT_PUBLICKEY', editPublicKey)
  yield ReduxSaga.takeEvery('DELETE_KEY', deleteKey)
}

function* rootSaga() {
  yield ReduxSaga.effects.all([
    watchUserRequests(),
  ])
}

sagaMiddleware.run(rootSaga)

riot.mount('*', {store:reduxStore})


//GLOBAL FUNCTIONS
function translateOS(x) {
    switch(x) {
        case 'esxi6.0': return 'ESXi 6.0'
        case 'esxi6.5': return 'ESXi 6.5'
        case 'centos7.3': return 'CentOS 7.3'
        case 'centos7.4': return 'CentOS 7.4'
        case 'win2012r2': return 'Windows 2012 R2'
        case 'win2016': return 'Windows 2016'
        case 'redhat7.2': return 'Red Hat 7.2'
        case 'redhat7.3': return 'Red Hat 7.3'
        case 'redhat7.4': return 'Red Hat 7.4'
        case 'rhvh4.1': return 'RHVH 4.1'
        default: return x
    }
}

function translateRole(x) {
    switch(x) {
        case 'generic': return 'No Kubernetes'
        case 'k8s master': return 'Kubernetes Master'
        case 'k8s node': return 'Kubernetes Worker'
        default: return x
    }
}
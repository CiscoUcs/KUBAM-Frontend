var sagaMiddleware = ReduxSaga.default()

if(window.location.hash.substring(1) == '') {
    route('hosts')
}

var defaultState = {
    isLoading: false
}

var loadingState = {
    isLoading: true
}

/*
 *  Make sure that when we get data from the server we ignore the selected field. 
 *  Then see if we already have selected (in the state) and make sure the new data 
 *  we get back matches.  This way we can switch tabs and still have data selected.
 */
function reconcileChecks(state, newData){
  // make it so they are always undefined. 
  if (state['hosts'] === undefined) {
    for (i in newData) {
      newData[i].selected = false
    } 
    return newData
  }else {
    for(i in newData) {
      if (i < state['hosts'].length) {
        state['hosts'][i].selected ? newData[i].selected = true : newData[i].selected = false
      }
    }
  }
  return newData
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
            if (top_key === "hosts") {
              add_data = reconcileChecks(state, add_data);
            }
            x[top_key] = add_data
            return Object.assign({},state,{isLoading: false},x)
            break;
        case 'TOGGLE_COMPUTE':
            for (i = 0; i < state['compute'].length; i++){
              obj = state['compute'][i]
              if (obj.dn === action.data) {
                obj.selected ? obj.selected = false : obj.selected = true
              }
            }
            return Object.assign({},state,{isLoading: false},state['compute'])
            break

        case 'TOGGLE_ALL_COMPUTE':
            for (i = 0; i < state['compute'].length; i++){
              action.data ? state['compute'][i].selected = true : state['compute'][i].selected = false
            }
            return Object.assign({},state,{isLoading: false},state['compute'])
            break
        
        case 'TOGGLE_HOST':
            for (i = 0; i < state['hosts'].length; i++){
              obj = state['hosts'][i]
              if (obj.name === action.data) {
                obj.selected ? obj.selected = false : obj.selected = true
              }
            }
            return Object.assign({},state,{isLoading: false},state['hosts'])
            break
        case 'TOGGLE_ALL_HOSTS':
            for (i = 0; i < state['hosts'].length; i++){
              action.data ? state['hosts'][i].selected = true : state['hosts'][i].selected = false
            }
            return Object.assign({},state,{isLoading: false},state['hosts'])
            break
            
        default:
            return state
    }
    return state
}

const reduxStore = Redux.createStore(
    reducer,
    Redux.applyMiddleware(sagaMiddleware)
)

function createAx() {
    const hname = window.location.hostname
    var port = window.location.port
    //var url = 'http://10.93.234.95/api/';
    var url = 'http://localhost/api/';
    if (port == "5000") {
      port = "80"
    }
    if (hname !== '' && port !== '') {
      url = 'http://' + hname + ':' + port + '/api/'
    }
    //console.log(url)
    //console.log(url);
    return axios.create({
        baseURL: url,
        timeout: 4000,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

var ax = createAx()

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
            message: 'Could not get ISO Images from server',
            err: error
        });
    });
}

function* createImgMapping(action) {
    new_mapping = {'os': action['data'].name,
                   'file': '/kubam/' + action['data'].iso
                  }
    
    ax.get('v1/isos/map', {})
    .then(function (response) {
        map = response['data']['iso_map'] || []
        new_map = []
        for(var i=0;i<map.length;i++) {
            //console.log(map[i].os)
            //console.log(new_mapping.os)
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
            reduxStore.dispatch({
                type: "OP_FAILED",
                message: 'Could not create image mapping',
                err: error
            });
        });
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            message: 'Could not create image mapping',
            err: error
        });
    });
}

function getCatalog(action){
    ax.get('/v1/catalog')
    .then(function (response) {
        //console.log(response['data'])
        reduxStore.dispatch({
        type: "FETCH_SUCCEEDED",
        data: {'catalog': response['data']}
        })
    })
    .catch(function (error) {
        reduxStore.dispatch({
        type: "OP_FAILED",
        message: 'Could not get Catalog from server',
        err: error
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
            message: 'Could not get ISO/file mapping from server',
            err: error
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
            reduxStore.dispatch({
                type: "OP_FAILED",
                message: 'Could not create image mapping',
                err: error
            });
        });
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            message: 'Could not create image mapping',
            err: error
        });
    });    
}


// get UCS server group informaiton
function* getInfraCompute(action) {
  ax.get('v2/servers/'+action.server+'/servers', {})
  .then(function (response) {
    reduxStore.dispatch({
      type: "FETCH_SUCCEEDED",
      data: {'compute': response['data']['servers'] }
    })
  })
  .catch(function (error) {
    reduxStore.dispatch({
      type: "OP_FAILED",
      message: 'Could not get infrastructure from server',
      err: error
    });
  });
}


/* get the infrastructure and all the servers in the 
 * infrastructure.  
 * This could take a long time on big systems. 
 */

function* getDeepInfraComponents(action) {
    ax.get('v2/servers', {})
    .then(function (response) {
        reduxStore.dispatch({
            type: "FETCH_SUCCEEDED",
            data: {'servers': response['data']['servers']}
        })
        console.log(response['data']['servers'])
        response['data']['servers'].forEach(el => {
          reduxStore.dispatch({
            type: 'FETCH_COMPUTE',
            server: el['name']
          })
        })
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            message: 'Could not get infrastructure from server',
            err: error
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
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            message: 'Could not get infrastructure from server',
            err: error
        });
    });
}



function* createInfraComponent(action) {    
    if (["imc", "ucsm", "ucsc"].includes(action['data']['type'])) {
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

                let errorObject=JSON.parse(JSON.stringify(error));
                if (errorObject == null) {
                  tag.innerHTML = error.message
                } else if (errorObject.response.status === 400) {
                  tag.innerHTML = errorObject.response.data.error;
                }else {
                  tag.innerHTML = "Error: Could not create controller"
                }
                document.getElementById('pop-box').append(tag)
                riot.mount(tag, 'alert', reduxStore); 
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
                reduxStore.dispatch({
                    type: "OP_FAILED",
                    message: 'Could not create ACI Fabric',
                    err: error
                });
        });
    } 
}

function* updateUCS(action) {    
    ax.put('v2/servers', action['data'])
    .then(function (response) {
        var tag = document.createElement("alert");
        tag.setAttribute("type", "success");
        tag.innerHTML = 'Success: UCS component updated'
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore); 
            
        reduxStore.dispatch({
            type: 'FETCH_INFRA'
        })
    })
    .catch(function(error) {
        var tag = document.createElement("alert");
        tag.setAttribute("type", "error");

        let errorObject=JSON.parse(JSON.stringify(error));
        if (errorObject == null) {
            tag.innerHTML = error.message
        } else if(errorObject.response.status === 400) {
            tag.innerHTML = errorObject.response.data.error;
        }else {
            tag.innerHTML = "Error: Could not update UCS component"
        }
            document.getElementById('pop-box').append(tag)
            riot.mount(tag, 'alert', reduxStore); 
    });
}

function* deleteInfraComponent(action) {    
    delete_id = {"name": action['data']['name']};
    
    if (["imc", "ucsm", "ucsc"].includes(action['data']['type'])) {
        ax.delete('v2/servers', {data: delete_id})
            .then(function (response) {
                var tag = document.createElement("alert");
                tag.setAttribute("type", "success");
                tag.innerHTML = 'Success: Component deleted'
                document.getElementById('pop-box').append(tag)
                riot.mount(tag, 'alert', reduxStore); 
            })
            .catch(function (error) {
                reduxStore.dispatch({
                    type: "OP_FAILED",
                    message: 'Could not delete infrastructure component',
                    err: error
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
            
            })
            .catch(function (error) {
                reduxStore.dispatch({
                    type: "OP_FAILED",
                    message: 'ACI fabric could not be deleted',
                    err: error
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
            message: 'Could not get networks from server',
            err: error
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

        // update the page with the new network group
        reduxStore.dispatch({
            type: 'FETCH_NETWORKGROUPS'
        })
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            message: "Can't create network group",
            err: error
        });
    });
}

function* updateNetworkGroup(action) {
    ax.put('v2/networks', action['data'])
    .then(function (response) {
        var tag = document.createElement("alert");
        tag.setAttribute("type", "success");
        tag.innerHTML = 'Success: Network group updated'
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore); 

        // update the page with the updated network group
        reduxStore.dispatch({
            type: 'FETCH_NETWORKGROUPS'
        })
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            message: "Can't update network group",
            err: error
        });
    });
}

function* deleteNetworkGroup(action) {
    ax.delete('v2/networks', { data: {"name": action['data']['name'] }})
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
        reduxStore.dispatch({
            type: "OP_FAILED",
            message: 'Could not delete network', 
            err: error
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
            message: 'Could not get keys from server',
            err: error
        });
    });
}

function* addPublicKey(action) {
    ax.get('v1/keys', {})
    .then(function (response) {
        post_data = response['data']
        post_data['keys'].push(action['data']['key'])
        console.log(post_data)
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
            reduxStore.dispatch({
                type: "OP_FAILED",
                message: 'Could not add public key',
                err: error
            });
        });
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            message: 'Could not add public key',
            err: error
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
            reduxStore.dispatch({
                type: "OP_FAILED",
                message: 'Could not add Public Key',
                err: error
            });
        });
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            message: 'Could not add Public Key',
            err: error
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
            reduxStore.dispatch({
                type: "OP_FAILED",
                message: 'Could not delete key',
                err: error
            });
        });
    })
    .catch(function (error) {
        reduxStore.dispatch({
            type: "OP_FAILED",
            message: 'Could not delete key',
            err: error
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
            message: 'Could not get the KUBAM IP from server',
            err: error
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
        reduxStore.dispatch({
            type: "OP_FAILED",
            message: 'Could not update KUBAM IP',
            err: error
        });
    });
}

function getNextObviousName(hosts) {
  // if no hosts yet, just call the first host kubam01. 
  if (hosts.length < 1) {
    return "kubam01";
  }
  // get last host
  const lastHost = hosts[hosts.length - 1].name
  const re = /\d+$/;
  var found = lastHost.match(re)
  // if it doesn't end in a number, then just append a -1 to the name.
  if ( found === null ) {
    return lastHost + "-1";
  }
  var startNum = found[0]
  var nextNum = parseInt(startNum, 10) + 1
  var nu = nextNum.toString();
  while (nu.length < startNum.length ) nu = "0" + nu; // pad the zeros
  var rh =  lastHost.replace(startNum, nu)
  //TODO: Make sure rh isn't in there from some crazy ordering schema. 
  return rh
}

// Get the range of IP addresses from the gateway and netmask
function ipFromNet(gateway, netmask) {
  var ipaddress = gateway.split('.');
  var netmaskblocks = netmask.split('.').map(function(el) { return parseInt(el, 10) });
  // invert for creating broadcast address (highest address)
  var invertedNetmaskblocks = netmaskblocks.map(function(el) { return el ^ 255; });
  var baseAddress = ipaddress.map(function(block, idx) { return block & netmaskblocks[idx]; });
  // TODO: big potential bugs here.  Several cases where this will not work. 
  if (baseAddress[3] === "0") {
    baseAddress[3] = "1";
  }
  if (baseAddress.join('.') === gateway) {
    baseAddress[3] = "2";
  }
  var broadcastaddress = baseAddress.map(function(block, idx) { return block | invertedNetmaskblocks[idx]; });
  return [baseAddress.join('.'), broadcastaddress.join('.')];
}

 // given an IP address,  automatically increase the IP address by k.
function bumpIP( ipa, k ) {
    ipa = ipa.split(".");
    var ipnum = 0;
    for ( var i = 0; i <= 3; ++i )
    {
        ipnum = ipnum * 0x100 + 1 * ipa[i];
    }
    ipnum += k;
    for ( i = 3; i >= 0; --i )
    {
        ipa[i] = ( ipnum & 0xFF ).toString(10);
        ipnum = Math.floor( ipnum / 256 );
    }
    return ipa.join(".");
}

function getNextObviousIP(hosts, ngs) {
  var lastNetGroup;
  // Get the last netgroup
  if (hosts.length < 1) {
    lastNetGroup = ngs[0];
  }else {
    lastNetGroupName = hosts[hosts.length - 1].network_group
    for (var i = 0; i < ngs.length; i++) {
      if (ngs[i].name === lastNetGroupName) {
        lastNetGroup = ngs[i] 
      }
    }
  }
  gateway = lastNetGroup.gateway
  netmask  = lastNetGroup.gateway
  var basemax = ipFromNet(gateway, netmask)
  var base = basemax[0];
  // now go through hosts and get the latest one. 
  for( var i = 0; i < hosts.length; i ++ ) {
    lastIP = hosts[i].ip;
    base = bumpIP(lastIP, 1);
  }
  // so many things wrong here that should be validated and fixed.  But will work for most envs I hopd!
  return base;
}

// get the last netgroup of the existing server. 
function getNextObviousNG(hosts, ngs) {
  ng = ""
  if (hosts.length < 1) {
    ng =  ngs[0].name
    return ng
  }
  ng = hosts[hosts.length - 1].network_group
  return ng
}

function getNextObviousRole(hosts) {
  if (hosts.length < 1 ) {
    return "generic"
  }
  return hosts[hosts.length - 1].role
}

function getNextObviousOS(hosts) {
  if (hosts.length < 1) {
    return "centos7.4"    
  }
  return hosts[hosts.length - 1].os
}

function* addHost(action) {
    hosts = reduxStore.getState().hosts
    ngs = reduxStore.getState().networks
    /* be smart: If there is no network group set, then set error and tell them to define network group first.  */
    if (ngs.length < 1 ) {
        var tag = document.createElement("alert");
        tag.setAttribute("type", "error");
        tag.innerHTML = 'Please create a network group before adding hosts';
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore); 
        return;
    }

    default_name = getNextObviousName(hosts);
    default_ip = getNextObviousIP(hosts, ngs);
    default_ng = getNextObviousNG(hosts, ngs); 
    default_os = getNextObviousOS(hosts);
    default_role = getNextObviousRole(hosts);

    hosts.push({ip: default_ip,
                name: default_name,
                network_group: default_ng,
                os: default_os,
                role: default_role
               })
    
    ax.post('v2/hosts', hosts)
    .then(function(response){
        var tag = document.createElement("alert");
        tag.setAttribute("type", "success");
        tag.innerHTML = 'Success: Host was added correctly'
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore); 
        })
    .catch(function(error){
        reduxStore.dispatch({
            type: "OP_FAILED",
            message: 'Could not add host',
            err: error
        });
    });

}

function incrementHost(suffix, nextI) {
    var nextNum = parseInt(suffix, 10) + nextI; // get the next number
    var nu = nextNum.toString(); // convert number to a string
    while ( nu.length < suffix.length) nu = "0" + nu;
    return nu;
}

// given the index of the host to be updated and the list of hosts
// update all the hosts to follow the name of this old one. 
// e.g if we have list kube01, kube02, kube03 and we change the first one to win01
// then the others will be updated to win02 and win03. 
function updateAllNames(index, newVal, hosts) {
  hosts[index].name = newVal
  // set any hosts after this host to the same name... keep it consistent.  
  var re = /\d+$/;
  var found = newVal.match(re);
  if (found != null) {
    var startNum = found[0];
    for(var j = parseInt(index) + 1, k = 1; j < hosts.length; j++, k++) {
        hosts[j].name = newVal.replace(startNum, incrementHost(startNum, k))
    }
  }
  return hosts
}

// update the IP address from index and all the ones following it. 
function updateAllIPs(index, newVal, hosts) {
  hosts[index].ip = newVal;
  var el = hosts[index].ip
  for (var j = parseInt(index) + 1, k = 1; j < hosts.length; j++, k++) {
    hosts[j].ip = bumpIP(el, k)
  }
  return hosts
}

// Generic function that updates all columns to match the one above it
// if it was changed.  
function updateAll(attrib, index, newVal, hosts) {
  for (var j = parseInt(index); j < hosts.length; j++) {
    // if they don't want one (server group, server, etc) then we delete. 
    if (newVal === "None") {
      hosts[j][attrib] = undefined;
      hosts[j] = JSON.parse(JSON.stringify(hosts[j]));
    }else {
      hosts[j][attrib] = newVal
    }
  }
  return hosts
}

// make boot images
function* makeBootImages(action) {
  hosts = []
  if (action.hosts != undefined && action.hosts.length > 0) {
    // get the hosts for action.hosts
    hosts = action.hosts 
  }
  ax.post('v2/deploy/images')
    .then(function(response) {
          var tag = document.createElement("alert");
          tag.setAttribute("type", "success");
          tag.innerHTML = 'Success: Built Images'
          document.getElementById('pop-box').append(tag)
          riot.mount(tag, 'alert', reduxStore); 
    })
   .catch(function(error){
      reduxStore.dispatch({
          type: "OP_FAILED",
          message: 'Could not make boot images',
          err: error
      });
  });
}

// returns the hosts that are selected. 
function getCheckedHosts() {
  var selectedHosts = [];
  for (i in reduxStore.getState().hosts) {
    if (reduxStore.getState().hosts[i].selected) {
      selectedHosts.push(reduxStore.getState().hosts[i])
    }
  }
  return selectedHosts
}


// updateHosts is called whenever the hosts are updated.  We update all 
// hosts and pass all previous hosts in to update it. 
function* updateHost(action) {
    hosts = reduxStore.getState().hosts
    if (action.newVal === action.oldVal) {
      // no change, do nothing
      return;
    }
    // set the old value to the new value.
    if(action.op === "host") {
      hosts = updateAllNames(action.index, action.newVal, hosts)
    } else if(action.op === "ip") {
      hosts = updateAllIPs(action.index, action.newVal, hosts)
    } else if(["os", "role", "network_group", "server_group"].includes(action.op)) {
      hosts = updateAll(action.op, action.index, action.newVal, hosts)
    }

    ax.post('v2/hosts', hosts)
    .then(function(response) {
        var tag = document.createElement("alert");
        tag.setAttribute("type", "success");
        tag.innerHTML = 'Success: ' + action.op + ' updated'
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore); 
        reduxStore.dispatch({
            type: "FETCH_HOSTS"
        })
    })
    .catch(function(error){
        let errorObject=JSON.parse(JSON.stringify(error));
        var tag = document.createElement("alert");
        tag.setAttribute("type", "error");
        if (errorObject.response.status === 400) {
          tag.innerHTML = errorObject.response.data.error;
        }else {
          tag.innerHTML = error.message
        }
        document.getElementById('pop-box').append(tag)
        riot.mount(tag, 'alert', reduxStore); 
        reduxStore.dispatch({
            type: "FETCH_HOSTS"
        })
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
            message: 'Could not get hosts from server',
            err: error
        });
    });
}

function* deleteHost(action){
    //remove = {"name": action['data'] }
    //ax.delete('v2/hosts', remove)
    ax.delete('v2/hosts', { data: { "name" : action['data'] }})
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
        reduxStore.dispatch({
            type: "OP_FAILED",
            message: 'Could not delete host',
            err: error
        });
    }); 
}

function* showError(action) {
    // action has: err and message
    var tag = document.createElement("alert");
    tag.setAttribute("type", "error");
    let errorObject=JSON.parse(JSON.stringify(action.err));
    if(Object.keys(errorObject).length === 0 && errorObject.constructor === Object) {
      tag.innerHTML = action.message
    } else if (errorObject.response.status === 400) {
      tag.innerHTML = errorObject.response.data.error;
    }else {
      tag.innerHTML = action.message
    }
    document.getElementById('pop-box').append(tag)
    riot.mount(tag, 'alert', reduxStore); 
}

function* watchUserRequests() {
  yield ReduxSaga.takeEvery('OP_FAILED', showError)
  
  yield ReduxSaga.takeEvery('ADD_HOST', addHost)
  yield ReduxSaga.takeEvery('UPDATE_HOST', updateHost)
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
  yield ReduxSaga.takeEvery('FETCH_DEEP_INFRA', getDeepInfraComponents)
  yield ReduxSaga.takeEvery('CREATE_CONTROLLER', createInfraComponent)
  yield ReduxSaga.takeEvery('DELETE_CONTROLLER', deleteInfraComponent)
  yield ReduxSaga.takeEvery('UPDATE_UCS', updateUCS)

  yield ReduxSaga.takeEvery('FETCH_COMPUTE', getInfraCompute)
  yield ReduxSaga.takeEvery('UPDATE_COMPUTE', updateInfraCompute)

  yield ReduxSaga.takeEvery('FETCH_NETWORKGROUPS', fetchNetworkGroups)
  yield ReduxSaga.takeEvery('CREATE_NETWORKGROUP', createNetworkGroup)
  yield ReduxSaga.takeEvery('UPDATE_NETWORKGROUP', updateNetworkGroup)
  yield ReduxSaga.takeEvery('DELETE_NETWORK', deleteNetworkGroup)
    
  yield ReduxSaga.takeEvery('FETCH_KEYS', getKeys)
  yield ReduxSaga.takeEvery('ADD_PUBLICKEY', addPublicKey)
  yield ReduxSaga.takeEvery('EDIT_PUBLICKEY', editPublicKey)
  yield ReduxSaga.takeEvery('DELETE_KEY', deleteKey)

  yield ReduxSaga.takeEvery('MAKEBOOT_IMAGES', makeBootImages)
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
        case 'centos7.5': return 'CentOS 7.5'
        case 'win2012r2': return 'Windows 2012 R2'
        case 'win2016': return 'Windows 2016'
        case 'redhat7.2': return 'Red Hat 7.2'
        case 'redhat7.3': return 'Red Hat 7.3'
        case 'redhat7.4': return 'Red Hat 7.4'
        case 'redhat7.5': return 'Red Hat 7.5'
        case 'rhvh4.1': return 'RHVH 4.1'
        default: return x
    }
}

function translateRole(x) {
    switch(x) {
        case 'generic': return 'General'
        case 'k8s master': return 'Kubernetes Master'
        case 'k8s node': return 'Kubernetes Worker'
        default: return x
    }
}

function roleCatalog(cat, host) {
  if (typeof cat != 'undefined' && typeof host != 'undefined') {
    return cat[host.os]
  }
  return []

}


function changeHostsSelection() {
    hostcheckboxes = document.getElementsByClassName('hostCheckBoxes')
    topbox = document.getElementById('select_all')
    reduxStore.dispatch({
      type: 'TOGGLE_ALL_HOSTS', 
      data: topbox.checked
    })
    h = hostsSelected()
    if (h){
      // enable all the non selected
      toggleActions(true)
    }else {
      toggleActions(false)
    }
}

function changeComputeSelection() {
    hostcheckboxes = document.getElementsByClassName('computeCheckBoxes')
    topbox = document.getElementById('selectAllCompute')
    reduxStore.dispatch({
      type: 'TOGGLE_ALL_COMPUTE', 
      data: topbox.checked
    })
}

// add disabled or not to the actions menu
function toggleActions(enabled) {
  actions = document.getElementsByClassName('dropdown-item')
  if (enabled) {
    for (i = 0; i < actions.length; i++) {
      actions[i].classList.remove("dropdown-disabled")
    }
  }else {
    for (i = 0; i < actions.length; i++) {
      actions[i].classList.add("dropdown-disabled")
    }
  }
}


// when checkbox is clicked.
function toggleCheck(e) {
  ds = e.target.dataset;
  reduxStore.dispatch({
    type: 'TOGGLE_HOST',
    data: ds.hostname
  })
  h = hostsSelected()
  if (h){
    // enable all the non selected
    toggleActions(true)
  }else {
    toggleActions(false)
  }
}

/* dn is for the distinguished name */
function toggleCheckCompute(e) {
  ds = e.target.dataset;
  reduxStore.dispatch({
    type: 'TOGGLE_COMPUTE',
    data: ds.dn,
  })
}

// returns true if at least one host is selected from check boxes
function hostsSelected() {
  for (i in reduxStore.getState().hosts) {
    if ( reduxStore.getState().hosts[i].selected ) {
      return true
    }
  }
  return false
}


function computeSelected(){
  for (i in reduxStore.getState().compute) {
    if ( reduxStore.getState().compute[i].selected ) {
      return true
    }
  }
  return false
}

// get checked compute node boxes. 
function getCheckedCompute(){
  var selectedCompute = [];
  for (i in reduxStore.getState().compute) {
    if (reduxStore.getState().compute[i].selected) {
      selectedCompute.push(reduxStore.getState().compute[i])
    }
  }
  return selectedCompute
}

// when target compute nodes are changed. 
function saveComputeSelection(e) {
  ds = e.target.dataset
  infraManager = ds.infra
  checkedCompute = getCheckedCompute() 
  var blades = Array() 
  var racks = Array() 
  for (k in checkedCompute){
    i = checkedCompute[k]
    if (i.type === "blade") {
      blades.push(i.chassis_id + "/" + i.slot)
    }else {
      racks.push(i.rack_id)
    }
  } 
  reduxStore.dispatch({
    type: 'UPDATE_COMPUTE',
    infra: infraManager ,
    compute: {"blades" : blades, "rack" : racks }
  })
}


// called when menu item is selected.  It may be active or not. 
function actionSelect(e) {
  if (e.target.classList.contains('dropdown-disabled')) {
    // do nothing cause there is nothing on the menu.
    e.stopPropagation();
  }
  ds = e.target.dataset;
  checkedHosts = getCheckedHosts()
  switch(ds.action) {
    case 'buildBootImages': 
      reduxStore.dispatch({
        type: 'MAKEBOOT_IMAGES', 
        hosts: checkedHosts.map((x) => x.name)
      })
      break;
    case 'deleteHosts': 
      for(i = 0; i < checkedHosts.length; i++){
        reduxStore.dispatch({
          type: 'DELETE_HOST', 
          data: checkedHosts[i].name
        })
      }
      break;
    default: 
      console.log("function not implemented.")
  }
  // when done should we uncheck all hosts? 
}


// update compute selection
function* updateInfraCompute(action) {
  compute = action.compute || []
  post_body = {'servers' : compute}
  //console.log(post_body, action.infra)
  ax.post('v2/servers/'+action.infra+'/servers', post_body)
    .then(function(response) {
          var tag = document.createElement("alert");
          tag.setAttribute("type", "success");
          tag.innerHTML = 'Success: Updated Compute Selection'
          document.getElementById('pop-box').append(tag)
          riot.mount(tag, 'alert', reduxStore); 
    })
   .catch(function(error){
      reduxStore.dispatch({
          type: "OP_FAILED",
          message: 'Could not save compute selection',
          err: error
      });
  });
}

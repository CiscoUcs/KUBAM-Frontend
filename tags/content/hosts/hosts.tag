<hosts>
  <div class="container table-responsive">
    <h2 class="categoryHeader">Hosts</h2>
    <div class="top-actions">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="hostActions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Actions
        </button>
        <div class="dropdown-menu" aria-labelledby="hostActions">
          <a class="dropdown-item dropdown-disabled" data-action="buildBootImages" onclick={actionSelect}>Build Boot Images</a>
          <a class="dropdown-item dropdown-disabled" data-action="deleteHosts" onclick={actionSelect}>Delete</a>
          <a class="dropdown-item dropdown-disabled" onclick={actionSelect}>Deploy Service Profile</a>
          <a class="dropdown-item dropdown-disabled" onclick={actionSelect}>Deploy VMedia Policy</a>
          <!-- <hr/>
          <a class="dropdown-item dropdown-disabled" onclick={actionSelect}>Power Off</a>
          <a class="dropdown-item dropdown-disabled" onclick={actionSelect}>Power On</a>
          <a class="dropdown-item dropdown-disabled" onclick={actionSelect}>Power Cycle (hard)</a>
          <a class="dropdown-item dropdown-disabled" onclick={actionSelect}>Power Cycle (soft)</a>
          --> 
        </div>
      </div>
    </div>

    <table class="table table-bordered table-striped small">
      <thead class="thead-dark">
        <tr>
          <th scope="col"><input type="checkbox"
                                id="select_all"
                                onclick={changeHostsSelection}/></th>
          <th scope="col">Hostname</th>
          <th scope="col">IP Address</th>
          <th scope="col">Operating System</th>
          <th scope="col">Role</th>
          <th scope="col">Network</th>
          <th scope="col">Server Group</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr each={host, iindex in this.opts.store.getState().hosts}>
          <td>
            <input type="checkbox" 
                  class="hostCheckBoxes" 
                  data-hostname={host.name} 
                  onclick={toggleCheck} 
                  checked="{host.selected}" />
          </td>
          <td>
            <!-- Host name --> 
            <input type="text" value="{host.name}" 
                data-op="host" data-old="{host.name}" 
                data-index="{iindex}" onblur="{changeHost}" />
          </td>
          <td>
            <!-- IP Address --> 
            <input type="text" value="{host.ip}" 
              data-op="ip" data-old="{host.ip}" 
              data-index="{iindex}" onblur="{changeHost}"/>
          </td>
          <td>
            <!-- operating system --> 
            <select class="custom-select" data-attrib="os" onChange={selectChange}>
              <option each={key, value in passStore.getState().catalog}
                  selected={value === host.os}
                  data-old={host.os}
                  value={value} data-new={value} data-index={iindex}
                  data-op="os">{translateOS(value)}
              </option>
            </select>
          </td>
          <td>
            <!-- role --> 
            <select class="custom-select" data-attrib="role" onChange={selectChange}>
              <option 
                each={ value in passStore.getState().catalog != null ? passStore.getState().catalog[host.os] : []} 
                selected={value=== host.role}
                data-old={host.role}
                data-new={value}
                data-index={iindex}
                data-op="role">
                  {translateRole(value)}
              </option>
            </select>
          </td>
          <td>
            <!-- network --> 
            <select class="custom-select" data-attrib="network_group" onChange={selectChange}>
              <option
                each={nw in passStore.getState().networks}
                selected={nw.name === host.network_group}
                data-old={host.network_group}
                data-new={nw.name}
                data-index={iindex}
                data-op="network_group">
                  {nw.name}
              </option>
            </selected>
          </td>
          <td>
            <!-- server group --> 
            <select class="custom-select" data-attrib="server_group" onChange={selectChange}>
              <option
                each={server in passStore.getState().servers}
                selected={server.name === host.server_group}
                data-old={host.server_group}
                data-new={server.name}
                data-index={iindex}
                data-op="server_group">
                  {server.name}
              </option>
            </selected>
          </td>
          <td>
            <!-- actions --> 
            <img src="./icons/delete.svg" data-hostname={host.name} onclick={deleteHost} class="table-icon">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
        
  <add-button onclick={addHost}>Add Host</add-button>
    
  <script>
        let currentValue
        let store = this.opts.store
                
        passStore.dispatch({
            type: 'FETCH_HOSTS'
        })
        
        passStore.dispatch({
            type: 'FETCH_CATALOG'
        })

        passStore.dispatch({
            type: 'FETCH_INFRA'
        })
        
        store.dispatch({
            type: 'FETCH_NETWORKGROUPS'
        })

        this.opts.store.subscribe(function(){
            let previousValue = currentValue;
            currentValue = store.getState()
            currentTab = window.location.hash.substr(1);
            if (JSON.stringify(previousValue) !== JSON.stringify(currentValue)) {
                if(currentTab == 'hosts') {
                    riot.update();
                }
            }
        })
        
        addHost() {
            passStore.dispatch({
                type: 'ADD_HOST',
                data: {}
            })
        }
        
        deleteHost(e) {
            ds = e.target.dataset;
            store.dispatch({
                type: 'DELETE_HOST',
                data: ds.hostname
            })
        }

        // Change an attribute of the host
        changeHost(e) {
          ds = e.target.dataset;
          newName = e.target.value;
          store.dispatch({
            type: 'UPDATE_HOST',
            index: ds.index,
            op: ds.op,
            oldVal: ds.old,
            newVal: e.target.value,
          })
          riot.update(); // added to update the os and other dropdowns. 
        }

        selectChange(e) {
          var select = e.target
          var optionSelected = select.options[select.selectedIndex]
          ds = optionSelected.dataset;
          store.dispatch({
            type: 'UPDATE_HOST',
            index: ds.index,
            op: ds.op,
            oldVal: ds.old,
            newVal: ds.new,
          })
          riot.update(); // added to update the os and other dropdowns. 
        }

    </script>
</hosts>

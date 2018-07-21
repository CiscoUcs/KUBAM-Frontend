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
                  <table-dropdown default={host.os} top="{host.os}" os="{host.os}" add="" index="{iindex}" changefunc={changeHost}>
                      <li each={key, value in passStore.getState().catalog}>
                        <a data-os="{value}" value="{value}" data-index="{this.opts.index}" data-op="os" data-old="{this.opts.top}" onclick={this.opts.changefunc}>{translateOS(value)}</a>
                      </li>
                  </table-dropdown>
          </td>
          <td>
            <!-- role --> 
                  <table-dropdown default={host.role} defrole={host.role} top="{translateRole(host.role)}" os="{host.os}" index="{iindex}" changefunc={changeHost}>
                    <li each={ value in passStore.getState().catalog != null ? passStore.getState().catalog[this.opts.os] : [] }>
                      <a data-role="{value}" value="{value}" data-index="{this.opts.index}" 
                         data-op="role" data-old="{this.opts.defrole}" onclick={this.opts.changefunc}>{translateRole(value)}</a>
                    </li>
                  </table-dropdown>
          </td>
          <td>
            <!-- network --> 
                  <table-dropdown default={host.network_group} top="{host.network_group}" index="{iindex}" changefunc={changeHost}>
                      <li each={nw in passStore.getState().networks}>
                          <a data-network_group="{nw.name}" value="{nw.name}" data-index="{this.opts.index}" 
                          data-op="network_group" data-old="{this.opts.top}" onclick={this.opts.changefunc}>{nw.name}</a>
                      </li>
                  </table-dropdown>
          </td>
          <td>
            <!-- server group --> 
                  <table-dropdown default="none" top="{host.server_group}" index="{iindex}" changefunc={changeHost}
                      serverarray={passStore.getState().servers != null ? passStore.getState().servers.concat({"name" : "None"}) : [{"name" : "None"}]}

                      >
                      <li each={server in this.opts.serverarray}>
                          <a data-server_group="{server.name}" value="{server.name}" data-index="{this.opts.index}" 
                          data-op="server_group" data-old="{this.opts.top}" onclick={this.opts.changefunc}>{server.name}</a>
                      </li>
                  </table-dropdown>
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

        // Change the hostname of the host
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
    </script>
</hosts>

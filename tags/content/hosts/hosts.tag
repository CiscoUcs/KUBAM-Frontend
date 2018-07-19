<hosts>
    <div class="svrGrpServers">
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

        <div class="table">
            <div class="tr">
                <div class="th checkbox_width">
                    <input type="checkbox" id="select_all" onclick={changeSelection}>     
                </div>
                <div class="th hostname_width">Hostname</div>
                <div class="th ip_width">Server IP</div>
                <div class="th dropdown_width">Operating System</div>
                <div class="th dropdown_width">Role</div>
                <div class="th dropdown_width">Network</div> 
                <div class="th dropdown_width">Server Group</div>
                <div class="th actionwidth">Actions</div>
            </div>
            <div class="tr" each={host, iindex in this.opts.store.getState().hosts}>
                <div class="td-host checkbox_width">
                    <input type="checkbox" class="hostcheckboxes" data-hostname={host.name} onclick={toggleCheck} checked="{host.selected}">
                </div>
                <div class="td-host hostname_width">
                    <input type="text" value="{host.name}" data-op="host" data-old="{host.name}" data-index="{iindex}" onblur="{changeHost}" />
                </div>
                <div class="td-host ip_width">
                    <input type="text" value="{host.ip}" data-op="ip" data-old="{host.ip}" data-index="{iindex}" onblur="{changeHost}"/>
                </div>
                <div id="os_drop" class="td-host  dropdown_width">
                    <table-dropdown default={host.os} top="{host.os}" os="{host.os}" add="" index="{iindex}" changefunc={changeHost}>
                        <li each={key, value in passStore.getState().catalog}>
                          <a data-os="{value}" value="{value}" data-index="{this.opts.index}" data-op="os" data-old="{this.opts.top}" onclick={this.opts.changefunc}>{translateOS(value)}</a>
                        </li>
                    </table-dropdown>
                </div>
                <div id="role_drop" class="td-host dropdown_width">
                    <table-dropdown default={host.role} defrole={host.role} top="{translateRole(host.role)}" os="{host.os}" index="{iindex}" changefunc={changeHost}>
                      <li each={ value in passStore.getState().catalog != null ? passStore.getState().catalog[this.opts.os] : [] }>
                        <a data-role="{value}" value="{value}" data-index="{this.opts.index}" 
                           data-op="role" data-old="{this.opts.defrole}" onclick={this.opts.changefunc}>{translateRole(value)}</a>
                      </li>
                    </table-dropdown>
                </div>
                <div id="nw_drop" class="td-host dropdown_width">
                    <table-dropdown default={host.network_group} top="{host.network_group}" index="{iindex}" changefunc={changeHost}>
                        <li each={nw in passStore.getState().networks}>
                            <a data-network_group="{nw.name}" value="{nw.name}" data-index="{this.opts.index}" 
                            data-op="network_group" data-old="{this.opts.top}" onclick={this.opts.changefunc}>{nw.name}</a>
                        </li>
                    </table-dropdown>
                </div>
                <div id="sg_drop" class="td-host dropdown_width">
                    <table-dropdown default="none" top="{host.server_group}" index="{iindex}" changefunc={changeHost}
                        serverarray={passStore.getState().servers != null ? passStore.getState().servers.concat({"name" : "None"}) : [{"name" : "None"}]}

                        >
                        <li each={server in this.opts.serverarray}>
                            <a data-server_group="{server.name}" value="{server.name}" data-index="{this.opts.index}" 
                            data-op="server_group" data-old="{this.opts.top}" onclick={this.opts.changefunc}>{server.name}</a>
                        </li>
                    </table-dropdown>
                </div>
                <div class="td  actionwidth">
                    <img src="./icons/delete.svg" data-hostname={host.name} onclick={deleteHost} class="table-icon">
                </div>
            </div>
        </div>
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
    
    <style>
        /* BASE TABLE DESIGN */
        .td-host {
            padding: 0;
            font-size: 0.8em;
            display: table-cell;
            border: 1px solid #ecedf1;
            background-color: #FFF;
        }
        
        /* TABLE COLUMNS */
        .checkbox_width {
            width: 20px;
        }
        
        .td-host input[type=checkbox] {
            position: relative;
            left: 12px;
        }
        
        .server {
            padding: 0;
            padding-left: 8px;
            vertical-align: middle;
        }
        
        .hostname_width {
            width: 140px;
        }
        
        .ip_width {
            width: 120px;
        }
        
        .dropdown_width {
            width: 136px;
            line-height: 1px;
        }
        
        /* TABLE INPUT HOVER */
        .hostname_width input:hover, .ip_width input:hover {
            background-image: url('icons/edit.svg');
            background-repeat: no-repeat;
            background-position: right;
        }
        
        .hostname_width input:focus, ip_width input:focus {
            background-image: none;
        }
        
        
        .svrGrpSettings {
            background-color: white;
            padding: 25px;
            margin-bottom: 20px;
            clear: both;
            overflow:auto;
        }
        
        .svrGrpServers {
            background-color: white;
            padding: 20px;
            overflow: hidden;
            min-height: 800px;
        }
        
        .table input[type=text] {
            border: none;
            outline:0;
            /* height: 45px; */
            width: 90%;
            /* line-height: 45px; */
            padding: 0;
            padding-left: 8px;
            padding-top: 2px;
            padding-bottom: 2px;
            margin: 0;
            font-size: 1em;
            cursor: pointer;
        }
    </style>
</hosts>

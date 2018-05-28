<hosts>
    
    <div class="svrGrpServers">
        <div class="top-actions">
            <fancy-dropdown inputid="actions" class="table-input">
                <option value="none">Actions</option>
                <option value="buildimage">Build server image</option>
                <option value="deploy">Deploy ALL</option>
                <option value="deploy">Deploy UCS</option>
                <option value="deploy">Deploy vmedia policy</option>
                <option value="deploy">Reset drives</option>
            </fancy-dropdown>
        </div>

       <table-search></table-search>
        <div class="table">
            <div class="tr">
                <div class="th checkbox_width">
                    <input type="checkbox" id="select_all" onclick={changeSelection}>     
                </div>
                <div class="th hostname_width">Hostname</div>
                <div class="th ip_width">Server IP</div>
                <div class="th dropdown_width">Operating System</div>
                <div class="th dropdown_width">Network</div>
                <div class="th">Server</div>
            </div>
            <div class="tr" each={host in this.opts.store.getState().hosts}>
                <div class="td-host checkbox_width">
                    <input type="checkbox" class="hostcheckboxes">
                </div>
                <div class="td-host hostname_width">
                    <input type="text" placeholder="{host.name}" />
                </div>
                <div class="td-host ip_width">
                    <input type="text" placeholder="{host.ip}" />
                </div>
                <div id="os_drop" class="td-host dropdown_width">
                    <table-dropdown default="Not selected!" top="" add="">
                        <li each={key, value in passStore.getState().catalog}><a  data-os="{value}" data-role="generic" onclick={switch_os}>{translateOS(value)}</a>
                            <ul>
                                <li each={cap in key}><a data-os="{value}" data-role="{cap}" onclick={switch_os}>{translateRole(cap)}</a></li>
                            </ul>
                        </li>
                    </table-dropdown>
                </div>
                <div id="nw_drop" class="td-host dropdown_width">
                    <table-dropdown default="Not selected!" top="" add="">
                        <li each={nw in passStore.getState().networks}>
                            <a data-nw="{nw.name}" onclick={switch_network}>{nw.name}</a>
                        </li>
                    </table-dropdown>
                </div>
                <div class="td-host server">
                    <div style="float:left;">
                        <div>Servergroup</div>
                        <div>Servername</div>
                    </div>
                    <div style="background-color: limegreen; font-size: 0.8em; width: 85px; height: 22px; text-align: center; line-height: 22px; color: white; float: left; border-radius: 25px; margin-left: 10px;">DEPLOYED</div>
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
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');
            
            modal_title.innerHTML = 'Add a new Host'
            
            modal_content.innerHTML = '';
            var tag = document.createElement("new-host");
            modal_content.append(tag)
            store = this.opts.store
            riot.mount(tag, 'new-host', store);
            
            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }
        
        deleteHost(e) {
            ds = e.target.dataset;
            store.dispatch({
                type: 'DELETE_HOST',
                data: ds.hostname
            })
        }
        closeModal() {
            document.getElementById('modal-shadow').style.display = 'None';
        }

        changeSelection() {
            hostcheckboxes = document.getElementsByClassName('hostcheckboxes')
            topbox = document.getElementById('select_all')
            for(i=0;i<hostcheckboxes.length;i++) {
                if(topbox.checked==true){
                hostcheckboxes[i].checked = true
                }
                else{
                    hostcheckboxes[i].checked = false
                }
            }
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

        
        
        
        
        
        .top-actions {
            margin-bottom: 15px;
        }
        
        .top-actions fancy-dropdown {
            cursor: pointer;
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
            height: 45px;
            width: 90%;
            line-height: 45px;
            padding: 0;
            padding-left: 8px;
            margin: 0;
            font-size: 1em;
            cursor: pointer;
        }
    </style>
</hosts>

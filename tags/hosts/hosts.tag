<hosts>
    
    <div class="svrGrpServers">
        <div class="top-actions">
            <fancy-dropdown inputid="actions" class="table-input">
                <option value="none">Actions</option>
                <option value="buildimage">Build Image</option>
                <option value="deploy">Deploy</option>    
            </fancy-dropdown>
        </div>
<!--        <table-search></table-search>-->

<!--        <table-search></table-search>-->
        <div class="table">
            <div class="tr">
                <div class="th">
                    <input type="checkbox" id="select_all" onclick={changeSelection}>     
                </div>
                <div class="th">Hostname</div>
                <div class="th">IP</div>
                <div class="th">Role</div>
                <div class="th">Server Group</div>
                <div class="th">Images</div>
                <div class="th">Network Group</div>
                <div class="th actionwidth">Actions</div>
            </div>
                <div class="tr" each={host in this.opts.store.getState().hosts}>
                    <div class="td" style="background-color: white">
                            <input type="checkbox" class="hostcheckboxes"></div>
                    <div class="td">{host.name}</div>
                    <div class="td">{host.ip}</div>
                    <div class="td">{host.role}</div>
                    <div class="td">{host.server_group}</div>
                    <div class="td">{host.os}</div>
                    <div class="td">{host.network_group}</div>
                    <div class="td  actionwidth">
                        <!--<img src="./icons/edit.svg" class="table-icon">-->
                        <img src="./icons/delete.svg" data-hostname={host.name} onclick={deleteHost} class="table-icon">
                    </div>
                </div>
            </div>
    </div>
        
    <add-button onclick={addHost}>Add Host</add-button>
    
    <script>
        let currentValue
        let store = this.opts.store
        
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
                
        passStore.dispatch({
            type: 'FETCH_HOSTS'
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
            for(i=0;i<hostcheckboxes.length;i++) {
                hostcheckboxes[i].checked = true
            }
        }
    </script>
    
    <style>
        .top-actions {
            height: 55px;
            margin-bottom: 5px;
        }
        
        fancy-dropdown{
            position: relative;
            top: 7px;
            float:left;
         }
        
        fancy-button{
            position: relative;
            left: 7px;
            float:left;
         }
        
        servergroup-view {
            padding-bottom: 20px;
        }
        
        .svrGrpSettings {
            background-color: white;
            padding: 25px;
            margin-bottom: 20px;
            clear: both;
            overflow:auto;
        }
        
        .table-input {
            margin: 0;
        }
        
        .marginright25px {
            margin-right: 25px;
        }
        
        .svrGrpServers {
            background-color: white;
            padding: 20px;
            overflow:auto;
        }
        
        .filter-input {
            background-color: white;
            padding: 10px;
            font-size: 0.9em;
        }
        
        .filter-input input {
            border-width: 0 0 1px 0;
            border-color: gainsboro;
            border-style: solid;
            width: 400px;
            margin-bottom: 5px;
        }
        
        .filter-input input:active, .filter-input input:focus {
            border-color: rgb(41,182,246);
        }
        
        .filter-input input:focus {
            outline: none;
        }
    </style>
</hosts>

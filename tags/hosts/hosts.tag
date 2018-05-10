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
                <div class="th"><input type="checkbox"></div>
                <div class="th">Hostname</div>
                <div class="th">IP</div>
                <div class="th">Role</div>
                <div class="th">Server Group</div>
                <div class="th">Images</div>
                <div class="th">Network Group</div>
            </div>
<!--            <div class="tr" each={servers}>
                <div class="td">
                    <input type="checkbox">
                </div>

                <div class="td">
                    <fancy-input inputid="servergroup-view-table-hostname" class="table-input">
                    </fancy-input>
                </div>

                <div class="td">
                    <fancy-input inputid="servergroup-view-table-hostname" class="table-input">
                    </fancy-input>
                </div>

                <div class="td">
                    <fancy-dropdown inputid="servergroup-view-table-role" class="table-input">
                        <option value="none">Pick a Role</option>
                        <option value="master">Master</option>
                        <option value="worker">Worker</option>
                    </fancy-dropdown>
                </div>

                <div class="td">
                    <fancy-dropdown inputid="servergroup-view-table-role" class="table-input">
                        <option value="none">Pick a Server Group</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </fancy-dropdown>
                </div>

                <div class="td">
                    <fancy-dropdown inputid="servergroup-view-table-role" class="table-input">
                        <option value="none">Select an image</option>
                        <option value="centos">CentOs</option>
                        <option value="windows">Windows</option>
                    </fancy-dropdown>
                </div>

                <div class="td">
                    <fancy-dropdown inputid="servergroup-view-table-role" class="table-input">
                        <option value="none">Select a Network Group</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </fancy-dropdown>
                </div>
                </div>-->
            </div>
        </div>
        
    <add-button onclick={addHost}>Add Host</add-button>
    
    <script>
        
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
        
        let store = this.opts.store
        
        store.dispatch({
            type: 'FETCH_HOSTS'
        })
        
        let currentValue
        this.opts.store.subscribe(function(){
            let previousValue = currentValue;
            currentValue = store.getState()
            currentTab = window.location.hash.substr(1);
            if (JSON.stringify(previousValue) !== JSON.stringify(currentValue)) {
                if(currentTab == 'images') {
                    riot.update();
                }
            }
        })
        
        closeModal() {
            document.getElementById('modal-shadow').style.display = 'None';
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

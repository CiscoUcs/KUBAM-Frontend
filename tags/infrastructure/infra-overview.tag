<infra-overview>
    <div class="infra-group"> 
        <div class="infra-container-big">
<!--                <table-search></table-search>-->
            <div class="containing-actions">
                <div class="top-actions">
                    <fancy-dropdown inputid="actions" class="table-input">
                        <option value="none">Actions</option>
                        <option value="Edit selected hosts">Edit selected hosts</option>
                        <option value="Delete select hosts">Delete select hosts</option>    
                    </fancy-dropdown>
                <div class="table">
                    <div class="tr">
                        <div class="th"><input type="checkbox"></div>
                        <div class="th">Name</div>
                        <div class="th">Description</div>
                        <div class="th">Type</div>
                        <!--<div class="th">Health</div>-->
                        <div class="th">Mgmt IP</div>
                        <div class="th">Tenant</div>
                        <!--<div class="th">Firmware version</div>-->
<!--                        <div class="th">Action</div>-->
                    </div>
                    <div class="tr" each={comp in this.opts.store.getState().servers}>
                        <div class="th" style="background-color: white"><input type="checkbox"></div>           <div class="td">{comp.name}</div>
                        <div class="td">{comp.description}</div>
                        <div class="td">{comp.type}</div>
                        <!--<div class="td">HEALTH</div>-->
                        <div class="td">{comp.credentials.ip}</div>
                        <div class="td">{comp.credentials.user}</div>
                        <!--<div class="td">FIRMWARE</div>-->
                        <div class="td">
                                 <!--<img src="./icons/edit.svg" class="table-icon">-->
<!--                                 <img src="./icons/delete.svg" data-type={comp.type} data-id={comp.id} onclick={deleteController} class="table-icon">-->
                        </div>
                    </div>
                    <div class="tr" each={comp in this.opts.store.getState().aci}>
                        <!--<div class="td"><input type="checkbox"></div>-->
                        <div class="td">{comp.name}</div>
                        <div class="td">{comp.description}</div>
                        <div class="td">{comp.type}</div>
                        <!--<div class="td">HEALTH</div>-->
                        <div class="td">{comp.credentials.ip}</div>
                        <div class="td">{comp.credentials.user}</div>
                                <!--<div class="td">FIRMWARE</div>-->
                                <div class="td">
<!--
                                         <img src="./icons/edit.svg" class="table-icon">
                                         <img src="./icons/delete.svg" data-type={comp.type} data-id={comp.id} onclick={deleteController} class="table-icon">
-->
                                </div>
                            </div>
                    </div>
            </div>
        </div>   
    </div>

    
    <add-button onclick={addController}>Add Controller</add-button>
    
    <style>
        .tablewidth {
            width: 720px;
        }
        
        .infra-group {
            padding-bottom: 15px;
        }
        
        .infra-container {
            background-color: white;
            padding: 20px;
        }
        
        
        .infra-container-big {
            background-color: white;
            padding: 34px 20px;
        }
    </style>
    
    <script>        
        let currentValue
        let store = this.opts.store
                
        store.dispatch({
            type: 'FETCH_INFRA'
        })
                
        this.opts.store.subscribe(function(){
            let previousValue = currentValue;
            currentValue = store.getState()
            currentTab = window.location.hash.substr(1);
            if (JSON.stringify(previousValue) !== JSON.stringify(currentValue)) {
                if(currentTab == 'infrastructure') {
                    riot.update();
                }
            }
        })
        
        addController() {
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');
            
            modal_title.innerHTML = 'Add a new Controller';
            
            modal_content.innerHTML = '';
            var tag = document.createElement("new-controller");
            modal_content.append(tag)
            passStore = this.opts.store
            riot.mount(tag, 'new-controller', passStore);
            
            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }
        
        deleteController(e) {
            ds = e.target.dataset;
            store.dispatch({
                type: 'DELETE_CONTROLLER',
                data: {
                    type: ds.type,
                    id: ds.id
                }
            })
        }
    </script>
</infra-overview>
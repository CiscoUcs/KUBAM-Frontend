<infra-overview>
    <div class="infra-group"> 
        <div class="infra-container-big">
            <!--<div class="containing-actions">
                <div class="top-actions">
                    <fancy-dropdown inputid="actions" class="table-input">
                        <option value="none">Actions</option>
                        <option value="Edit selected hosts">Edit selected hosts</option>
                        <option value="Delete select hosts">Delete select hosts</option>    
                    </fancy-dropdown>
                </div>
            </div>-->
            
            <h2 class="categoryHeader">UCS Servers</h2>
            <div id="ucs-rows" class="table bottomspace">
                <div class="tr">
                    <!--<div class="th"><input type="checkbox"></div>-->
                    <div class="th">Name</div>
                    <div class="th">Description</div>
                    <div class="th">Type</div>
                    <div class="th">Mgmt IP</div>
                    <div class="th">User</div>
                    <div class="th actionwidth">Actions</div>
                </div>
                <div data-id={comp.id} class="tr" each={comp in this.opts.store.getState().servers}>
                    <div class="td">
                        <input type="text" value="{comp.name}" data-name="{comp.name}" data-id="{comp.id}" onblur="{editUCS}" />
                    </div>
                    <div class="td">
                        <input type="text" value="{comp.description}" data-description="{comp.description}" data-id="{comp.id}" onblur="{editUCS}" />
                    </div>
                    <div class="td">{comp.type}</div>
                    <div class="td">
                        <input type="text" value="{comp.credentials.ip}" data-ip="{comp.credentials.ip}" data-id="{comp.id}" onblur="{editUCS}" />
                    </div>
                    <div class="td" data-pw="{comp.credentials.password}">
                        {comp.credentials.user}
                    </div>
                    <div class="td  actionwidth">
                        <img src="./icons/delete.svg" data-type={comp.type} data-name={comp.name} onclick={deleteController} class="table-icon">
                    </div>
                </div>
            </div>
            <!--
            <h2 class="categoryHeader">ACI Fabrics</h2>
            <div class="table">
                <div class="tr">
                    <div class="th">Name</div>
                    <div class="th">Description</div>
                    <div class="th">Mgmt IP</div>
                    <div class="th">Tenant</div>
                    <div class="th actionwidth">Actions</div>
                </div>
                <div class="tr" each={comp in this.opts.store.getState().aci}>
                    <div class="td">{comp.name}</div>
                    <div class="td">{comp.description}</div>
                    <div class="td">{comp.credentials.ip}</div>
                    <div class="td">{comp.credentials.user}</div>
                    <div class="td actionwidth">
                        <img src="./icons/edit.svg" class="table-icon">
                        <img src="./icons/delete.svg" data-type={comp.type} data-name={comp.name} onclick={deleteController} class="table-icon">
                    </div>
                </div>
            </div>
            -->
        </div>
    </div>   

    
    <add-button onclick={addController}>Add Controller</add-button>
    
    <style>
        .tablewidth {
            width: 720px;
        }
        
        .bottomspace {
            margin-bottom: 25px;
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
        
        .td input[type="text"] {
            border: none;
            outline:0;
            width: 95%;
            padding: 0;
            padding-left: 8px;
            padding-top: 2px;
            padding-bottom: 2px;
            margin: 0;
            font-size: 1em;
            cursor: pointer;
        }
        
        .td input[type="text"]:hover {
            background-image: url('icons/edit.svg');
            background-repeat: no-repeat;
            background-position: right;
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
                    name: ds.name
                }
            })
        }
        
        editUCS(e) {
            ds = e.target.dataset;
            id = ds.id
            rows = document.getElementById('ucs-rows')
            for(i=1;i<rows.children.length;i++) {
                row = rows.children[i]
                if(row.dataset.id == id) {
                    c = row.children
                    updated = {
                        "id": row.dataset.id,
                        "name": c[0].children[0].value.trim(),
                        "description": c[1].children[0].value,
                        "type": c[2].innerHTML.trim(),
                        "credentials": {
                            "ip" : c[3].children[0].value,
                            "user" : c[4].innerHTML.trim(),
                            "password" : c[4].dataset.pw
                        }
                    }

                    store.dispatch({
                        type: 'UPDATE_UCS',
                        data: updated
                    })
                }
            }
        }
    </script>
</infra-overview>
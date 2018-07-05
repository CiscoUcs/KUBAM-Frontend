<network>      
        <add-button onclick={addNetworkGroup}>
            Add Network Group
        </add-button>

        <div class="network-group"> 
            <div class="network-container-big">
                <div id="networkgroup-rows" class="table networkwidthtablelimit">
                    <div class="tr">
                        <div class="th">Network Name</div>
                        <div class="th">Netmask</div>
                        <div class="th">Router</div>
                        <div class="th">Name Server</div>
                        <div class="th">NTP Server</div>
                        <div class="th">Proxy Server</div>
                        <div class="th">VLAN</div>
                        <div class="th actionwidth">Actions</div>
                    </div>
                    <div class="tr" data-id="{nw.id}" each={nw in this.opts.store.getState().networks}>
                        <div class="td">
                            <input type="text" value="{nw.name}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}" />
                        </div>
                        <div class="td">
                            <input type="text" value="{nw.netmask}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}" />
                        </div>
                        <div class="td">
                            <input type="text" value="{nw.gateway}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}" />
                        </div>
                        <div class="td">
                            <input type="text" value="{nw.nameserver}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}" />
                        </div>
                        <div class="td">
                            <input type="text" value="{nw.ntpserver}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}" />
                        </div>
                        <div class="td">                            
                            <input type="text" value="{nw.proxy}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}" />
                        </div>
                        <div class="td">
                            <input type="text" value="{nw.vlan}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}" />
                        </div>
                        <div class="td actionwidth">
                            <img src="./icons/delete.svg" data-name={nw.name} onclick={deleteNetwork} class="table-icon">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    <style>
        .network-group {
            padding-bottom: 15px;
            background-color: white;
            padding: 20px;
        }
        
        .network-container {
            background-color: white;
            padding: 20px;
        }
        
        .networkwidthtablelimit {
            width: 100%;
            table-layout: fixed;
            word-wrap: break-word;
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
            type: 'FETCH_NETWORKGROUPS'
        })
        
        this.opts.store.subscribe(function(){
            let previousValue = currentValue;
            currentValue = store.getState()
            currentTab = window.location.hash.substr(1);
            if (JSON.stringify(previousValue) !== JSON.stringify(currentValue)) {
                if(currentTab == 'network') {
                    riot.update();
                }
            }
        })
        
        addNetworkGroup() {
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');
            
            modal_title.innerHTML = 'Add a new Network group'
            
            modal_content.innerHTML = '';
            var tag = document.createElement("new-networkgroup");
            modal_content.append(tag)
            riot.mount(tag, 'new-networkgroup');
            
            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }
        
        deleteNetwork(e) {
            ds = e.target.dataset;
            store.dispatch({
                type: 'DELETE_NETWORK',
                data: {
                    name: ds.name
                }
            })
        }
        
        editNetwork(e) {
            ds = e.target.dataset;
            id = ds.id
            rows = document.getElementById('networkgroup-rows')
            for(i=1;i<rows.children.length;i++) {
                row = rows.children[i]
                if(row.dataset.id == id) {
                    c = row.children
                    updated = {
                        "id": row.dataset.id,
                        "name": c[0].children[0].value.trim(),
                        "netmask": c[1].children[0].value,
                        "gateway": c[2].children[0].value,
                        "nameserver": c[3].children[0].value,
                        "ntpserver": c[4].children[0].value,
                        "proxy": c[5].children[0].value,
                        "vlan": c[6].children[0].value
                    }
                    store.dispatch({
                        type: 'UPDATE_NETWORKGROUP',
                        data: updated
                    })
                }
            }
        }
    </script>
</network>

<network>      
        <add-button onclick={addNetworkGroup}>
            Add Network Group
        </add-button>

        <div class="network-group"> 
            <div class="top-actions">
                <fancy-dropdown inputid="actions" class="table-input">
                    <option value="none">Actions</option>
                    <option value="Edit selected hosts">Edit selected hosts</option>
                    <option value="Delete select hosts">Delete select hosts</option>    
                </fancy-dropdown>
            </div>
            <div class="network-container-big">
<!--                <table-search></table-search>-->
                <div class="table">
                    <div class="tr">
                        <div class="th"><input type="checkbox"></div>
                        <div class="th">Network Name</div>
                        <div class="th">Netmask</div>
                        <div class="th">Router</div>
                        <div class="th">Name Server</div>
                        <div class="th">NTP Server</div>
                        <div class="th">Proxy Server</div>
                        <div class="th">VLAN</div>
                    </div>
                    <div class="tr" each={nw in this.opts.store.getState().networks}>
                        <div class="th" style="background-color: white"><input type="checkbox"></div>
                        <div class="td">{nw.name}</div>
                        <div class="td">{nw.netmask}</div>
                        <div class="td">{nw.gateway}</div>
                        <div class="td">{nw.nameserver}</div>
                        <div class="td">{nw.ntpserver}</div>
                        <div class="td">{nw.proxy}</div>
                        <div class="td">{nw.vlan}</div>
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
    </script>
</network>

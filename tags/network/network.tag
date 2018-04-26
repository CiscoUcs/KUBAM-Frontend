<network>
    <div class="network-group">
        <h1 class="categoryHeader">Network Groups</h1>
        </div>
        
        <add-button onclick={addNetworkGroup}>
            Add Network Group
        </add-button>
        
        <div class="network-group"> 
            <div class="network-container-big">
                <table-search></table-search>
                <div class="table">
                    <div class="tr">
                        <div class="th">Network Group Name</div>
                        <div class="th">Netmask</div>
                        <div class="th">Router</div>
                        <div class="th">Name Server</div>
                        <div class="th">NTP Server</div>
                        <div class="th">Proxy Server</div>
                        <div class="th">VLAN</div>
                    </div>
                    <div class="tr" each={nw in this.opts.store.getState().network}>
                        <div class="td">{nw_group_name}</div>
                        <div class="td">{netmask}</div>
                        <div class="td">{router}</div>
                        <div class="td">{nameserver}</div>
                        <div class="td">{ntp_server}</div>
                        <div class="td">{proxy_server}</div>
                        <div class="td">{vlan}</div>
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

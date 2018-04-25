<network>
    <div class="network-group">
        <h1 class="categoryHeader">New Network Group</h1>
        </div>
        
        <add-button onclick={addNetworkGroup}>
            Add Network Group
        </add-button>
        
        <hr />

        <div class="infra-group"> 
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
                    <div class="tr" each={comp in this.opts.store.getState().infracomponents}>
                        <div class="td"></div>
                        <div class="td"></div>
                        <div class="td"></div>
                        <div class="td"></div>
                        <div class="td"></div>
                        <div class="td"></div>
                        <div class="td"></div>
                    </div>
                </div>
            </div>
        </div>
    
    </div>
    
    <style>
        .network-group {
            padding-bottom: 15px;
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
            
            modal_title.innerHTML = 'Add a new Image'
            
            modal_content.innerHTML = '';
            var tag = document.createElement("new-networkgroup");
            modal_content.append(tag)
            riot.mount(tag, 'new-networkgroup');
            
            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }
    </script>
</network>

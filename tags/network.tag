<network>
    <div class="network-group">
        <h1 class="categoryHeader">New Network Group</h1>
        <div class="network-container">
            <fancy-input tag="Network Group Name"
                         inputid="network-view-groupname">
            </fancy-input>
            <fancy-input tag="Netmask"
                         inputid="network-view-netmask">
            </fancy-input>
            <fancy-input tag="Router"
                         inputid="network-view-router">
            </fancy-input>
            <fancy-input tag="Name Server"
                         inputid="network-view-nameserver">
            </fancy-input>
            <fancy-input tag="NTP Server"
                         inputid="network-view-ntp">
            </fancy-input>
            <fancy-input tag="Proxy Server (optional)"
                         inputid="network-view-proxy">
            </fancy-input>
            <fancy-input tag="VLAN (optional)"
                         inputid="network-view-vlan">
            </fancy-input>
            <hr />
            <fancy-button>Create</fancy-button>
        </div>
        
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
</network>

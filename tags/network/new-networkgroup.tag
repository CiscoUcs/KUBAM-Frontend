<new-networkgroup>
    <form>
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
    </form>
        
    <fancy-button onclick={createServerGroup}>Create</fancy-button>
    <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>
    
    <style>
        form{
            align-content: center;
            align-items: center;
        }
    
    </style>
</new-networkgroup>
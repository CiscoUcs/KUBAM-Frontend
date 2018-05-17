<new-networkgroup>
    <form>
        <div class="network-container">
            <fancy-input tag="Network Group Name"
                         inputid="network-view-groupname"
                         tip="Custom name for this network">
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
        </div>
    </form>
        
    <fancy-button onclick={createNetworkGroup}>Create</fancy-button>
    <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>
    
    <style>
        form{
            text-align: left;
            align-items: left;
        }
    
    </style>
    
    <script>
            
        closeModal() {
            document.getElementById('modal-shadow').style.display = 'None';
        }
        
        createNetworkGroup() {
            passStore.dispatch({
                type: 'CREATE_NETWORKGROUP',
                data: {
                    'name': document.getElementById('network-view-groupname').value,
                    'netmask': document.getElementById('network-view-netmask').value,
                    'gateway': document.getElementById('network-view-router').value,
                    'nameserver': document.getElementById('network-view-nameserver').value,
                    'ntpserver': document.getElementById('network-view-ntp').value,
                    'proxy': document.getElementById('network-view-proxy').value,
                    'vlan': document.getElementById('network-view-vlan').value
                }
            })
            this.closeModal()
        }
    </script>
</new-networkgroup>
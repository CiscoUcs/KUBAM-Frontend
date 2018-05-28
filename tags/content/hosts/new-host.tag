<new-host>
    <form>
        <fancy-dropdown name="Server Group" tag="Server Selection" inputid="select-server-group">
            <option each={comp in passStore.getState().servers} value="{comp.id}">{comp.name}</option>
        </fancy-dropdown><br>
        <!--
        <fancy-input tag="IP" inputid="servergroup-new-ip"></fancy-input>
        <fancy-input tag="Hostname" inputid="servergroup-new-hostname"></fancy-input>
        <fancy-dropdown name="Role" tag="Role" inputid="select-role">
          <option value="generic">No Kubernetes</option>
          <option value="master">Master</option>
          <option value="worker">Worker</option>
        </fancy-dropdown><br>
        <fancy-dropdown name="Images" tag="Images" inputid="select-images">
            <option each={img in passStore.getState().iso_map} value="{img.os}">{img.os}</option>
        </fancy-dropdown><br>
        <fancy-dropdown name="Network Group" tag="Network Group" inputid="select-network-group">
          <option each={nw in passStore.getState().networks} value="{nw.id}">{nw.name}</option>
        </fancy-dropdown><br>
        -->
    </form>
    
    <fancy-button onclick={addHost}>Create</fancy-button>
    <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>
    
    <style>
        form{
            text-align: left;
        }
    
    </style>
    
    <script>
        passStore.dispatch({
            type: 'FETCH_MAPPINGS',
        })
        
        passStore.dispatch({
            type: 'FETCH_IMAGES',
        })

        passStore.dispatch({
            type: 'FETCH_INFRA',
        })
        passStore.dispatch({
            type: 'FETCH_NETWORKGROUPS'
        })
        
        let currentValue
        passStore.subscribe(function(){
        let previousValue = currentValue;
        currentValue = passStore.getState()
        currentTab = window.location.hash.substr(1);
        if (JSON.stringify(previousValue) !== JSON.stringify(currentValue)) {
            if(currentTab == 'hosts') {
                    riot.update();
                }
            }
        })
        
        addHost() {       
            passStore.dispatch({
                type: 'ADD_HOST',
                data: {
                    'server_group': document.getElementById('select-server-group').value
                    }
            })
            this.closeModal()
        }

            
        closeModal() {
            document.getElementById('modal-shadow').style.display = 'None';
        }
    </script>
</new-host>
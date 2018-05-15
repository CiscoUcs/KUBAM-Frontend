<new-host>
    <form>
        
        <fancy-input tag="Hostname" inputid="servergroup-new-hostname"></fancy-input>
        <fancy-input tag="IP" inputid="servergroup-new-ip"></fancy-input>
        
            <fancy-dropdown name="Role" tag="Role" inputid="select-role">
              <option value="generic">Generic</option>
              <option value="master">Master</option>
              <option value="worker">Worker</option>
            </fancy-dropdown><br>
            <fancy-dropdown name="Server Group" tag="Server Group" inputid="select-server-group">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </fancy-dropdown><br>
            <fancy-dropdown name="Images" tag="Images" inputid="select-images">
                <option each={img in passStore.getState().isos} value="{img}">{img.substring(0,21)}...</option>
            </fancy-dropdown><br>
            <fancy-dropdown name="Network Group" tag="Network Group" inputid="select-network-group">
              <option value="networkgroup1">Network Group 1</option>
              <option value="networkgroup2">Network Group 2</option>
            </fancy-dropdown><br>

    </form>
    <fancy-button onclick={addHost}>Create</fancy-button>
    <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>
    
    <style>
        form{
            text-align: left;
        }
    
    </style>
    
    <script>
        let currentValue
        let store = this.opts.store
        
        passStore.dispatch({
            type: 'FETCH_HOSTS'
        })

        this.opts.store.subscribe(function(){
        let previousValue = currentValue;
        currentValue = store.getState()
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
                    'name': document.getElementById('servergroup-new-hostname').value,
                    'ip': document.getElementById('servergroup-new-ip').value,
                    'role': document.getElementById('select-role').value,
                    'server_group': document.getElementById('select-server-group').value,
                    'os': document.getElementById('select-images').value,
                    'network_group': document.getElementById('select-network-group').value
                    }
            })
            this.closeModal()
        }

            
        closeModal() {
            document.getElementById('modal-shadow').style.display = 'None';
        }
    </script>
</new-host>
<new-host>
    <form>
        
        <fancy-input tag="Hostname" inputid="servergroup-new-hostname"></fancy-input>
        <fancy-input tag="IP" inputid="servergroup-new-ip"></fancy-input>
        
            <fancy-dropdown name="Role" tag="Role" inputid="select-role">
              <option value="Master">Master</option>
              <option value="Worker">Worker</option>
            </fancy-dropdown><br>
            <fancy-dropdown name="Server Group" tag="Server Group" inputid="select-server-group">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </fancy-dropdown><br>
            <fancy-dropdown name="Images" tag="Images" inputid="select-images">
              <option value="centos7.4">centos7.4</option>
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
<new-controller>
    <div>
        <fancy-dropdown tag="Type"
                        inputid="srvgroup-new-type">
            <option value="ucsm">UCS Manager</option>
            <option value="imc">UCS Standalone</option>
            <option value="aci">ACI Fabric</option>
        </fancy-dropdown>

        <fancy-input tag="Name"
                     inputid="srvgroup-new-name">
        </fancy-input>
        <fancy-input tag="Description"
                     inputid="srvgroup-new-description">
        </fancy-input>
        <fancy-input tag="IP Address"
                     inputid="srvgroup-new-ip">
        </fancy-input>
        <fancy-input tag="Username"
                     inputid="srvgroup-new-username">
        </fancy-input>
        <fancy-input tag="Password"
                     inputid="srvgroup-new-password"
                     settype="password">
        </fancy-input>
    </div>
    <fancy-button onclick={createSrvGroup}>Create</fancy-button>
    <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>

    
    <script>
        closeModal() {
            document.getElementById('modal-shadow').style.display = 'None';
        }
        
        createSrvGroup() {
            passStore.dispatch({
                type: 'CREATE_SRVGROUP',
                data: {
                    'type': document.getElementById('srvgroup-new-type').value,
                    'name': document.getElementById('srvgroup-new-name').value,
                    'description': document.getElementById('srvgroup-new-description').value,
                    'credentials': {
                        'user': document.getElementById('srvgroup-new-username').value,
                        'password': document.getElementById('srvgroup-new-password').value,
                        'server': document.getElementById('srvgroup-new-ip').value
                    }                    
                }
            })
            this.closeModal()
        }
    </script>
    
    <style>
        new-controller {
            text-align: left;
        }
    </style>
</new-controller>
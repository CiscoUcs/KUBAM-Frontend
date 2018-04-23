<new-controller>
    <div>
        <fancy-dropdown tag="Type"
                        input-id="servergroup-new-type">
            <option value="ucsm">UCS Manager</option>
            <option value="imc">UCS Standalone</option>
            <option value="aci">ACI Fabric</option>
        </fancy-dropdown>

        <fancy-input tag="Name"
                     input-id="servergroup-new-name">
        </fancy-input>
        <fancy-input tag="Description"
                     input-id="servergroup-new-description">
        </fancy-input>
        <fancy-input tag="IP Address"
                     input-id="servergroup-new-ip">
        </fancy-input>
        <fancy-input tag="Username"
                     input-id="servergroup-new-username">
        </fancy-input>
        <fancy-input tag="Password"
                     input-id="servergroup-new-password">
        </fancy-input>
    </div>
    <fancy-button onclick={createServerGroup}>Create</fancy-button>
    <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>

    
    <script>
        closeModal() {
            document.getElementById('modal-shadow').style.display = 'None';
        }
        
        createServerGroup() {
            console.log('a')
        }
    </script>
    
    <style>
        new-controller {
            text-align: left;
        }
    </style>
</new-controller>
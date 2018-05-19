<new-servergroup>
    <div class="newSvrGrpInputs">
        <fancy-dropdown tag="Type"
                        input-id="servergroup-new-type">
            <option value="kubernetes">Kubernetes</option>
            <option value="hypervisor">Bare-metal Hypervisor</option>
            <option value="pureos">Bare-metal OS</option>
        </fancy-dropdown>

        <fancy-input tag="Name"
                     input-id="servergroup-new-name">
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
        new-servergroup {
            text-align: left;
        }
        
        .newSvrGrpInputs {
            margin-bottom: 4px;
        }
    </style>
</new-servergroup>
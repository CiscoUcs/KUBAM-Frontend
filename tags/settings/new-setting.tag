<new-setting>
    <div class="settings-container">
        <fancy-input tag="KUBAM IP Address"
                     inputid="settings-view-ip">
        </fancy-input>
        <fancy-input tag="Public Key"
                     inputid="settings-view-key">
        </fancy-input>
    </div>
    
    <fancy-button onclick={addPublicKey}>Create</fancy-button>
    <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>
    
    <style>
        .settings-container{
            text-align: left;
            align-items: left;
        }
    </style>
    
    <script>
        closeModal() {
            document.getElementById('modal-shadow').style.display = 'None';
        }
        
        addPublicKey() {
            passStore.dispatch({
                type: 'ADD_PUBLICKEY',
                data: {
                    'key': document.getElementById('settings-view-key').value
            }})
            this.closeModal()
        }
    </script>
</new-setting>
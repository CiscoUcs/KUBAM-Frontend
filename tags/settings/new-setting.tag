<new-setting>
    <div class="settings-container">
        <fancy-textarea tag="Public Key"
                     inputid="settings-view-key">
        </fancy-textarea>
    </div>
    
    <fancy-button onclick={addPublicKey}>Create</fancy-button>
    <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>
    
    <style>
        .settings-container{
            text-align: left;
            align-items: left;
        }
         fancy-textarea textarea{
            width:520px;
            height:120px;
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
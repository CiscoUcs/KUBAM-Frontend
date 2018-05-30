<edit-setting>
    <div class="settings-container">
        <fancy-textarea tag="Public Key"
                        inputid="settings-view-key">
        </fancy-textarea>
    </div>
    
    <fancy-button onclick={editPublicKey}>Create</fancy-button>
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
        
        editPublicKey() {
            passStore.dispatch({
                type: 'EDIT_PUBLICKEY',
                data: {
                    'new_key': document.getElementById('settings-view-key').value,
                    'old_key': current_key
            }})
            this.closeModal()
        }
    </script>
</edit-setting>
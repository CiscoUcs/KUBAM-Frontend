<new-setting>
    <div class="settings-container">
        <fancy-input tag="Public Key"
                     inputid="settings-view-key">
        </fancy-input>
    </div>
    
    <fancy-button onclick={createServerGroup}>Create</fancy-button>
    <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>
    
    <style>
        .settings-container{
            text-align: left;
            align-items: left;
        }
    </style>
</new-setting>
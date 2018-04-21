<new-serverimage>
    <form>
        OS:
            <fancy-dropdown name="OS">
              <option value="CentOS">CentOS</option>
              <option value="VMware ESXi">VMware ESXi</option>
            </fancy-dropdown><br>
        
        <fancy-input tag="Name" input-id="servergroup-new-name">
        </fancy-input>
        <fancy-input tag="Version" input-id="servergroup-new-version">
        </fancy-input>
    </form>
    <fancy-button onclick={createServerGroup}>Create</fancy-button>
    <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>
    
    <style>
        form{
            align-content: center;
            align-items: center;
        }
    
    </style>
</new-serverimage>
<new-serverimage>
    <form>        
        <fancy-input tag="Name" input-id="servergroup-new-name">
        </fancy-input>
        <fancy-dropdown name="ISO" tag="ISO">
            <option value="CentOS">CentOS</option>
            <option value="VMware ESXi">VMware ESXi</option>
        </fancy-dropdown><br>
    </form>
    <fancy-button onclick={createServerGroup}>Create</fancy-button>
    <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>
    
    <style>
        form{
            text-align: left;
        }
    
    </style>
</new-serverimage>
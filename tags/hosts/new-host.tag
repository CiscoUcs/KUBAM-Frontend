<new-host>
    <form>
        
        <fancy-input tag="Hostname" input-id="servergroup-new-hostname"></fancy-input>
        <fancy-input tag="IP" input-id="servergroup-new-ip"></fancy-input>
        
        Role:
            <fancy-dropdown name="Role">
              <option value="Master">Master</option>
              <option value="Worker">Worker</option>
            </fancy-dropdown><br>
        Server Group:
            <fancy-dropdown name="Server Group">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </fancy-dropdown><br>
        Images:
            <fancy-dropdown name="Images">
              <option value="image1">Image 1</option>
              <option value="image2">Image 2</option>
            </fancy-dropdown><br>
        Network Group:
            <fancy-dropdown name="Network Group">
              <option value="networkgroup1">Network Group 1</option>
              <option value="networkgroup2">Network Group 2</option>
            </fancy-dropdown><br>

    </form>
    <fancy-button onclick={createServerGroup}>Create</fancy-button>
    <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>
    
    <style>
        form{
            align-content: center;
            align-items: center;
        }
    
    </style>
</new-host>
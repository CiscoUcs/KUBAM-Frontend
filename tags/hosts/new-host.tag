<new-host>
    <form>
        
        <fancy-input tag="Hostname" input-id="servergroup-new-hostname"></fancy-input>
        <fancy-input tag="IP" input-id="servergroup-new-ip"></fancy-input>
        
            <fancy-dropdown name="Role" tag="Role">
              <option value="Master">Master</option>
              <option value="Worker">Worker</option>
            </fancy-dropdown><br>
            <fancy-dropdown name="Server Group" tag="Server Group">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </fancy-dropdown><br>
            <fancy-dropdown name="Images" tag="Images">
              <option value="image1">Image 1</option>
              <option value="image2">Image 2</option>
            </fancy-dropdown><br>
            <fancy-dropdown name="Network Group" tag="Network Group">
              <option value="networkgroup1">Network Group 1</option>
              <option value="networkgroup2">Network Group 2</option>
            </fancy-dropdown><br>

    </form>
    <fancy-button onclick={addHost}>Create</fancy-button>
    <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>
    
    <style>
        form{
            text-align: left;
        }
    
    </style>
    
    <script>
        
            addHost() {
            passStore.dispatch({
                type: 'ADD_HOST',
                data: {
                    'key': document.getElementById('settings-view-key').value
            }})
            this.closeModal()
        }

            
        closeModal() {
            document.getElementById('modal-shadow').style.display = 'None';
        }
    </script>
</new-host>
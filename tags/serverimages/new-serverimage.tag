<new-serverimage>
    <form>        
        <fancy-input tag="Name" input-id="mapping-name">
        </fancy-input>
        <fancy-dropdown name="ISO" tag="ISO">
            <option value="CentOS">CentOS</option>
            <option value="VMware ESXi">VMware ESXi</option>
        </fancy-dropdown><br>
    </form>
    <fancy-button onclick={createImageMapping}>Create</fancy-button>
    <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>
    
    <style>
        form{
            text-align: left;
        }
    
    </style>
    
    <script>
        closeModal() {
            document.getElementById('modal-shadow').style.display = 'None';
        }
        
        createImageMapping() {
            passStore.dispatch({
                type: 'CREATE_IMGMAPPING',
                data: {
                    'name': document.getElementById('mapping-name').value,
                    'iso': document.getElementById('mapping-iso').value                  
                }
            })
            this.closeModal()
        }
    </script>
</new-serverimage>
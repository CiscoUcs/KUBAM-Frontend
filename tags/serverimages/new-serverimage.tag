<new-serverimage>
    <form>
        <fancy-dropdown tag="Operating System"
                        inputid="mapping-name">
            <option value="centos7.3">CentOS 7.3</option>
            <option value="centos7.4">CentOS 7.4</option>
            <option value="esxi6.0">ESXi 6.0</option>
            <option value="esxi6.5">ESXi 6.5</option>
            <option value="redhat7.2">RedHat 7.2</option>
            <option value="redhat7.3">redhat7.3</option>
            <option value="redhat7.4">redhat7.4</option>
            <option value="win2016">Windows 2016</option>
            <option value="win2012">Windows 2012</option>
           
        </fancy-dropdown>
        <fancy-dropdown name="ISO" tag="ISO" inputid="mapping-iso">            
            <option each={img in passStore.getState().isos} value="{img}">{img.substring(0,60)}{img.length > 60 && "..."}</option>
        </fancy-dropdown><br>
    </form>
    <fancy-button onclick={createImageMapping}>Create</fancy-button>
    <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>
    
    <style>        
        form{
            text-align: left;
        }
    
        fancy-dropdown select {
            width: 490px;
        }
    </style>
    
    <script>
        passStore.dispatch({
            type: 'FETCH_IMAGES'
        })
        
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
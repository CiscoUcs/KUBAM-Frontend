<new-serverimage>
    <form>        
        <fancy-input tag="Name" inputid="mapping-name">
        </fancy-input>
        <fancy-dropdown name="ISO" tag="ISO" inputid="mapping-iso">            
            <option each={img in passStore.getState().isos} value="{img}">{img.substring(0,21)}...</option>
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
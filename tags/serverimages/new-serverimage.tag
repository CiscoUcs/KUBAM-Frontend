<new-serverimage>
    <form> 
        <fancy-dropdown tag="Operating System"
                        inputid="mapping-name">
            <option each={key, value in passStore.getState().catalog} value="{value}">{value}
            </option>
           
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
        
        passStore.dispatch({
            type: 'FETCH_CATALOG'
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
        resolveName(){
            }
    </script>
</new-serverimage>
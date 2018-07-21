<edit-serverimage>
    <form> 
        <div class="editmapping">Edit Mapping for: {translateOS(current_os)}</div>
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
        
        .editmapping {
            text-align: center;
            margin-top: 4px;
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
                    'name': current_os,
                    'iso': document.getElementById('mapping-iso').value
                }
            })
            this.closeModal()
        }
    </script>
</edit-serverimage>
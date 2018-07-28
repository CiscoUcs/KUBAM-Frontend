<serverimages-overview> 
    <div class="container">
      <!-- <h2 class="categoryHeader">OS Images</h2> --> 
      <table class="table table-bordered table-striped small">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Operating System</th>
            <th scope="col">File</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr each={img in this.opts.store.getState().iso_map}> 
            <td>{translateOS(img.os)}</td>
            <td class="td">{img.file}</td>
            <td class="td actionwidth">
                <img src="./icons/edit.svg" class="table-icon" data-os={img.os} onclick={editServerimage}>
                <img src="./icons/delete.svg" data-os={img.os} onclick={deleteMapping} class="table-icon">
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <add-button onclick={addServerimage}>Add new Image</add-button>
    
    <style>
        .os-container {
            background-color: white;
            padding: 34px 20px;
        }
        
        .osgroup {
            margin-bottom: 25px;
            margin-right: 25px;
            float: left;
            width: 100%;
        }
        
        .osselect {
            background-color: #363c51;
            font-size: 0.95em;
            color: white;
            border: 1px solid #ecedf1;
            padding: 10px;
            width: 580px;
        }
        
        .centeralign {
            text-align: center;
        }
        
        .tablewidth {
            width: 600px;
        }
    </style>
    
    <script>
        let store = this.opts.store
        //console.log(this.opts.store.getState().iso_map) 
        store.dispatch({
            type: 'FETCH_MAPPINGS'
        })
    
        addServerimage() {
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');
            
            modal_title.innerHTML = 'Add a new Image'
            
            modal_content.innerHTML = '';
            var tag = document.createElement("new-serverimage");
            modal_content.append(tag)
            passStore = this.opts.store
            riot.mount(tag, 'new-serverimage', passStore);
            
            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }
        
        editServerimage(e) {
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');
            
            modal_title.innerHTML = 'Edit an Image'
            
            modal_content.innerHTML = '';
            var tag = document.createElement("edit-serverimage");
            modal_content.append(tag)
            passStore = this.opts.store
            current_os = e.target.dataset.os
            riot.mount(tag, 'edit-serverimage', passStore, current_os);
            
            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }
        
        let currentValue
        this.opts.store.subscribe(function(){
            let previousValue = currentValue;
            currentValue = store.getState()
            currentTab = window.location.hash.substr(1);
            if (JSON.stringify(previousValue) !== JSON.stringify(currentValue)) {
                if(currentTab == 'images') {
                    riot.update();
                }
            }
        })
        
        deleteMapping(e) {
            ds = e.target.dataset;
            store.dispatch({
                type: 'DELETE_MAPPING',
                data: {
                    os: ds.os
                }
            })
        }
        

    </script>
</serverimages-overview>




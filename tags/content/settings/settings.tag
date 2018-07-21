<settings>    
    <div class="container table-responsive">
      <h2 class="categoryHeader">Settings</h2>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">KUBAM IP</span>
        </div>
        <input type="text" class="form-control" 
                    inputid="settings-view-ip"
                    value={this.opts.store.getState().kubam_ip}
                    tip="This is the IP from which the servers will load the Vmedia. Usually it is the same IP as the web interface"> 
        <button class="btn btn-outline-secondary" onclick={updateIP} type="button">Update</button>
      </div>
      <table class="table table-bordered table-striped keywidthtablelimit small">
        <thead class="thead-dark">
          <tr>
            <th scope="col" width="90%">Public Keys</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr each={k in this.opts.store.getState().keys}>
            <td><span class="small">{k}</span></td>
            <td>
              <img src="./icons/edit.svg" class="table-icon" data-id={k} onclick={editSetting}>
              <img src="./icons/delete.svg" data-id={k} onclick={deleteKey} class="table-icon">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <add-button onclick={addSetting}>
        Add Setting
    </add-button>

    
    <style>
        .keywidthtablelimit {
            width: 100%;
            word-wrap: break-word;
            table-layout: fixed; 
        }
    </style>
    
    <script>
        let store = this.opts.store
        
        store.dispatch({
            type: 'FETCH_IP'
        })
        
        store.dispatch({
            type: 'FETCH_KEYS'
        })
        
        let currentValue
        this.opts.store.subscribe(function(){
            let previousValue = currentValue;
            currentValue = store.getState()
            currentTab = window.location.hash.substr(1);
            if (JSON.stringify(previousValue) !== JSON.stringify(currentValue)) {
                if(currentTab == 'settings') {
                    riot.update();
                }
            }
        })
        
        updateIP() {
            var new_ip = document.getElementById('settings-view-ip').value
            store.dispatch({
                type: 'UPDATE_IP',
                data: {
                    kubam_ip: new_ip
                }
            })
        }
        
        addSetting() {
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');
            
            modal_title.innerHTML = 'Add New Public Key'
            
            modal_content.innerHTML = '';
            var tag = document.createElement("new-setting");
            modal_content.append(tag)
            riot.mount(tag, 'new-setting');
            
            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }
        
        editSetting(e) {
            current_key = e.target.dataset.id
            
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');
            
            modal_title.innerHTML = 'Edit a Public Key'
            
            modal_content.innerHTML = '';
            var tag = document.createElement("edit-setting");
            modal_content.append(tag)
            riot.mount(tag, 'edit-setting', passStore, current_key);
            
            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }
        
        deleteKey(e) {
            ds = e.target.dataset;
            store.dispatch({
                type: 'DELETE_KEY',
                data: {
                    id: ds.id
                }
            })
        }
    </script>
    
</settings>

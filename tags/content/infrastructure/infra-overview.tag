<infra-overview>
    <div class="container">
        <h2 class="categoryHeader">UCS Servers</h2>
        <table class="table table-bordered table-striped small">
          <thead class="thead-dark">
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Mgmt IP</th>
            <th scope="col">User</th>
            <th scope="col">Actions</th>
          <thead>
          <tbody>
            <tr data-id={comp.id} each={comp in this.opts.store.getState().servers}>
                <td>
                    <a if={comp.type === "imc"}>{comp.name}</a>
                    <a if={comp.type !== "imc"} href="#infrastructure/{comp.name}">{comp.name}</a>
                </td>  
                <td>
                    {comp.description}
                </td>
                <td>{comp.type}</td>
                <td>
                  {comp.credentials.ip}
                </td>
                <td>
                    {comp.credentials.user}
                </td>
                <td>
                    <img src="./icons/delete.svg" data-type={comp.type} data-name={comp.name} onclick={deleteController} class="table-icon">
                </td>
            </tr> 
          </tbody>
        </table>
    </div>

    
    <add-button onclick={addController}>Add Controller</add-button>
    
    <script>        
        let currentValue
        let store = this.opts.store
                
        store.dispatch({
            type: 'FETCH_INFRA'
        })
                
        this.opts.store.subscribe(function(){
            let previousValue = currentValue;
            currentValue = store.getState()
            currentTab = window.location.hash.substr(1);
            if (JSON.stringify(previousValue) !== JSON.stringify(currentValue)) {
                if(currentTab == 'infrastructure') {
                    riot.update();
                }
            }
        })
        
        addController() {
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');
            
            modal_title.innerHTML = 'Add a new Controller';
            
            modal_content.innerHTML = '';
            var tag = document.createElement("new-controller");
            modal_content.append(tag)
            passStore = this.opts.store
            riot.mount(tag, 'new-controller', passStore);
            
            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }
        
        deleteController(e) {
            ds = e.target.dataset;
            store.dispatch({
                type: 'DELETE_CONTROLLER',
                data: {
                    type: ds.type,
                    name: ds.name
                }
            })
        }
        
        editUCS(e) {
            ds = e.target.dataset;
            id = ds.id
            rows = document.getElementById('ucs-rows')
            for(i=1;i<rows.children.length;i++) {
                row = rows.children[i]
                if(row.dataset.id == id) {
                    c = row.children
                    updated = {
                        "id": row.dataset.id,
                        "name": c[0].children[0].value.trim(),
                        "description": c[1].children[0].value,
                        "type": c[2].innerHTML.trim(),
                        "credentials": {
                            "ip" : c[3].children[0].value,
                            "user" : c[4].innerHTML.trim(),
                            "password" : c[4].dataset.pw
                        }
                    }

                    store.dispatch({
                        type: 'UPDATE_UCS',
                        data: updated
                    })
                }
            }
        }
    </script>
</infra-overview>

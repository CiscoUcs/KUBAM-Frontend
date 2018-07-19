<infra-detail>
    <h2 class="categoryHeader">{ name }</h2>
    <script>        
      this.on('route', name => this.name = name)
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
</infra-detail>

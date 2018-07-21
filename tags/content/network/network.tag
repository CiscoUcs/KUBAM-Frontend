<network>      
  <div class="container table-responsive">
    <h2 class="categoryHeader">Network Groups</h2>
      <table class="table table-bordered table-striped small">
        <thead class="thead-dark">
          <th scope="col">Network Name</div>
          <th scope="col">Netmask</div>
          <th scope="col">Router</div>
          <th scope="col">Name Server</div>
          <th scope="col">NTP Server</div>
          <th scope="col">Proxy Server</div>
          <th scope="col">VLAN</div>
          <th scope="col">Actions</div>
        </thead>
        <tbody>
          <tr data-id="{nw.id}" 
              id="{nw.id}"
              each={nw in this.opts.store.getState().networks}>
            <td>
             <input type="text" value="{nw.name}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}" />
            </td>
            <td>
              <input type="text" value="{nw.netmask}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}" />
            </td>
            <td>
              <input type="text" value="{nw.gateway}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}" />
            </td>
            <td>
              <input type="text" value="{nw.nameserver}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}" />
            </td>
            <td>
              <input type="text" value="{nw.ntpserver}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}" />
            </td>
            <td>
              <input type="text" value="{nw.proxy}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}" />
            </td>
            <td>
              <input type="text" value="{nw.vlan}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}" />
            </td>
            <td>
              <img src="./icons/delete.svg" data-name={nw.name} onclick={deleteNetwork} class="table-icon">
            </td>
          </tr>
        </tbody>
      </table>
    <add-button onclick={addNetworkGroup}>Add Network Group</add-button>
  </div>  
    <script>
        let currentValue
        let store = this.opts.store
                
        store.dispatch({
            type: 'FETCH_NETWORKGROUPS'
        })
        
        this.opts.store.subscribe(function(){
            let previousValue = currentValue;
            currentValue = store.getState()
            currentTab = window.location.hash.substr(1);
            if (JSON.stringify(previousValue) !== JSON.stringify(currentValue)) {
                if(currentTab == 'network') {
                    riot.update();
                }
            }
        })
        
        addNetworkGroup() {
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');
            
            modal_title.innerHTML = 'Add a new Network group'
            
            modal_content.innerHTML = '';
            var tag = document.createElement("new-networkgroup");
            modal_content.append(tag)
            riot.mount(tag, 'new-networkgroup');
            
            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }
        
        deleteNetwork(e) {
            ds = e.target.dataset;
            store.dispatch({
                type: 'DELETE_NETWORK',
                data: {
                    name: ds.name
                }
            })
        }
        
        editNetwork(e) {
            ds = e.target.dataset;
            id = ds.id
            row = document.getElementById(id)
            c = row.children
            console.log(c)
            updated = {
              "id": row.dataset.id,
              "name": c[0].children[0].value.trim(),
              "netmask": c[1].children[0].value,
              "gateway": c[2].children[0].value,
              "nameserver": c[3].children[0].value,
              "ntpserver": c[4].children[0].value,
              "proxy": c[5].children[0].value,
              "vlan": c[6].children[0].value
            }
            store.dispatch({
                type: 'UPDATE_NETWORKGROUP',
                data: updated
            })
        }
    </script>
</network>

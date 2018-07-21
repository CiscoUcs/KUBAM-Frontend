<infra-detail>
    <h2 class="categoryHeader">{ name }</h2>
    <p>Select Servers to be used by KUBAM then save the changes</p>
    <div class="top-actions">
      <button type="button" class="btn btn-secondary" data-infra={name} onclick={saveComputeSelection}>Save Selections</button>
    </div>
    <table class="table table-bordered table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col"><input type="checkbox" 
                                id="selectAllCompute"
                                onclick={changeComputeSelection}/></th>
          <th scope="col">Server</th>
          <th scope="col">Server Type</th>
          <th scope="col">Model</th>
          <th scope="col">Service Profile</th>
          <th scope="col">Power</th>
          <th scope="col">CPU (count/cores)</th>
          <th scope="col">Memory (count/speed)</th>
        </tr>
      </thead>
      <tbody>
        <tr class="{ 'table-primary' : comp.selected === true }" 
            each={comp in this.opts.store.getState().compute}>
          <td><input  type="checkbox" 
                      data-dn={comp.dn}
                      class="computeCheckBoxes"
                      checked={comp.selected}
                      onclick={toggleCheckCompute}/></td>
          <td if={ comp.type === 'blade'}> {comp.chassis_id} / {comp.slot}</td>
          <td if={ comp.type === 'rack'}> {comp.rack_id } </td>
          <td>{comp.type}</td>
          <td>{comp.model}</td>
          <td if={ comp.association === 'none'}> Unassociated</td>
          <td if={ comp.association !== 'none'}> {comp.service_profile} </td>
          <td>{comp.oper_power} </td>
          <td>{comp.num_cpus}  / {comp.num_cores}</td>
          <td>{comp.ram}  / {comp.ram_speed}</td>
        </tr>
      </tbody>
    </table>
    <script>        
      let currentValue
      let store = this.opts.store

      this.on('route', name => {
        this.name = name
        store.dispatch({
            type: 'FETCH_COMPUTE',
            server: this.name
        })
      })
                
      this.opts.store.subscribe(function(){
        let previousValue = currentValue;
        currentValue = store.getState()
        currentTab = window.location.hash.substr(1);
        if (JSON.stringify(previousValue) !== JSON.stringify(currentValue)) {
            if(currentTab.startsWith('infrastructure')) {
                riot.update();
            }
        }
      })
    </script>
</infra-detail>

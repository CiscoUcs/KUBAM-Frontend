riot.tag2('app', '<top-bar store="{this.opts.store}"></top-bar> <side-bar store="{this.opts.store}"></side-bar> <content store="{this.opts.store}"></content>', '', '', function(opts) {
});

riot.tag2('feedback', '<div class="container"> <h2 class="categoryHeader">Feedback</h2> <form> Feedback sent here goes to a WebEx teams room that KUBAM developers will see. If you wish to be contacted please enter your contact details and we will try to provide support. <br> <br> Alternatively, feel free to <a href="https://github.com/CiscoUcs/KUBaM/issues/new">open an issue on Github</a> <hr> <div class="form-group"> <label for="feedback-contact">Contact Information (optional)</label> <input class="form-control" id="feedback-contact" aria-describedby="emailHelp" placeholder="Enter email" type="email"> <small id="emailHelp" class="form-text text-muted">We\'ll never share your email with anyone else.</small> </div> <div class="form-group"> <label for="feedback-message">Feedback</label> <textarea class="form-control" id="feedback-message" rows="6"></textarea> </div> <button type="submit" class="btn btn-primary mb-2" onclick="{send_feedback}">Send</button> </form> </div>', '', '', function(opts) {
        this.send_feedback = function() {
            var instance = axios.create({
                baseURL: 'https://feedback.kubam.io/',
                timeout: 5000,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            user = document.getElementById('feedback-contact').value;
            message = document.getElementById('feedback-message').value;

            if(message != null) {
                out = 'Contact: ' + user || 'Not provided'
                out += ' \n '
                out += 'Message: ' + message

            instance.post('/v1/feedback', {
                message: out
              })
              .then(function (response) {
                var tag = document.createElement("alert");
                tag.setAttribute("type", "success");
                tag.innerHTML = 'Success: Feedback was sent to the team'
                document.getElementById('pop-box').append(tag)
                riot.mount(tag, 'alert', reduxStore);
              })
              .catch(function (error) {
                var tag = document.createElement("alert");
                tag.setAttribute("type", "error");
                tag.innerHTML = 'Error: Feedback could not be sent';
                document.getElementById('pop-box').append(tag)
                riot.mount(tag, 'alert', reduxStore);
              });
            } else {
                console.error('NO MESSAGE DEFINED!')
            }
        }.bind(this)
});

riot.tag2('hosts', '<div class="container table-responsive"> <h2 class="categoryHeader">Hosts</h2> <div class="top-actions"> <div class="dropdown"> <button class="btn btn-secondary dropdown-toggle" type="button" id="hostActions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Actions </button> <div class="dropdown-menu" aria-labelledby="hostActions"> <a class="dropdown-item dropdown-disabled" data-action="buildBootImages" onclick="{actionSelect}">Build Boot Images</a> <a class="dropdown-item dropdown-disabled" data-action="deleteHosts" onclick="{actionSelect}">Delete</a> <a class="dropdown-item dropdown-disabled" onclick="{actionSelect}">Deploy Service Profile</a> <a class="dropdown-item dropdown-disabled" onclick="{actionSelect}">Deploy VMedia Policy</a> </div> </div> </div> <table class="table table-bordered table-striped small"> <thead class="thead-dark"> <tr> <th scope="col"><input type="checkbox" id="select_all" onclick="{changeHostsSelection}"></th> <th scope="col">Hostname</th> <th scope="col">IP Address</th> <th scope="col">Operating System</th> <th scope="col">Role</th> <th scope="col">Network</th> <th scope="col">Server Group</th> <th scope="col">Actions</th> </tr> </thead> <tbody> <tr each="{host, iindex in this.opts.store.getState().hosts}"> <td> <input type="checkbox" class="hostCheckBoxes form-control" data-hostname="{host.name}" onclick="{toggleCheck}" checked="{host.selected}"> </td> <td> <input type="text" class="form-control" riot-value="{host.name}" data-op="host" data-old="{host.name}" data-index="{iindex}" onblur="{changeHost}"> </td> <td> <input type="text" riot-value="{host.ip}" data-op="ip" data-old="{host.ip}" class="form-control" data-index="{iindex}" onblur="{changeHost}"> </td> <td> <select class="custom-select" data-attrib="os" onchange="{selectChange}"> <option each="{key, value in passStore.getState().catalog}" selected="{value === host.os}" data-old="{host.os}" riot-value="{value}" data-new="{value}" data-index="{iindex}" data-op="os">{translateOS(value)} </option> </select> </td> <td> <select class="custom-select" data-attrib="role" onchange="{selectChange}"> <option each="{value in passStore.getState().catalog != null ? passStore.getState().catalog[host.os] : []}" selected="{value=== host.role}" data-old="{host.role}" data-new="{value}" data-index="{iindex}" data-op="role"> {translateRole(value)} </option> </select> </td> <td> <select class="custom-select" data-attrib="network_group" onchange="{selectChange}"> <option each="{nw in passStore.getState().networks}" selected="{nw.name === host.network_group}" data-old="{host.network_group}" data-new="{nw.name}" data-index="{iindex}" data-op="network_group"> {nw.name} </option> </selected> </td> <td> <select class="custom-select" data-attrib="server_group" onchange="{selectChange}"> <option each="{server in passStore.getState().servers}" selected="{server.name === host.server_group}" data-old="{host.server_group}" data-new="{server.name}" data-index="{iindex}" data-op="server_group"> {server.name} </option> </selected> </td> <td> <img src="./icons/delete.svg" data-hostname="{host.name}" onclick="{deleteHost}" class="table-icon"> </td> </tr> </tbody> </table> </div> <add-button onclick="{addHost}">Add Host</add-button>', '', '', function(opts) {
        let currentValue
        let store = this.opts.store

        passStore.dispatch({
            type: 'FETCH_HOSTS'
        })

        passStore.dispatch({
            type: 'FETCH_CATALOG'
        })

        passStore.dispatch({
            type: 'FETCH_INFRA'
        })

        store.dispatch({
            type: 'FETCH_NETWORKGROUPS'
        })

        this.opts.store.subscribe(function(){
            let previousValue = currentValue;
            currentValue = store.getState()
            currentTab = window.location.hash.substr(1);
            if (JSON.stringify(previousValue) !== JSON.stringify(currentValue)) {
                if(currentTab == 'hosts') {
                    riot.update();
                }
            }
        })

        this.addHost = function() {
            passStore.dispatch({
                type: 'ADD_HOST',
                data: {}
            })
        }.bind(this)

        this.deleteHost = function(e) {
            ds = e.target.dataset;
            store.dispatch({
                type: 'DELETE_HOST',
                data: ds.hostname
            })
        }.bind(this)

        this.changeHost = function(e) {
          ds = e.target.dataset;
          newName = e.target.value;
          store.dispatch({
            type: 'UPDATE_HOST',
            index: ds.index,
            op: ds.op,
            oldVal: ds.old,
            newVal: e.target.value,
          })
          riot.update();
        }.bind(this)

        this.selectChange = function(e) {
          var select = e.target
          var optionSelected = select.options[select.selectedIndex]
          ds = optionSelected.dataset;
          store.dispatch({
            type: 'UPDATE_HOST',
            index: ds.index,
            op: ds.op,
            oldVal: ds.old,
            newVal: ds.new,
          })
          riot.update();
        }.bind(this)

});

riot.tag2('new-host', '<form> <fancy-dropdown name="Server Group" tag="Server Selection" inputid="select-server-group"> <option each="{comp in passStore.getState().servers}" riot-value="{comp.id}">{comp.name}</option> </fancy-dropdown><br> </form> <fancy-button onclick="{addHost}">Create</fancy-button> <fancy-button color="gray" onclick="{closeModal}">Cancel</fancy-button>', 'new-host form,[data-is="new-host"] form{ text-align: left; }', '', function(opts) {
        passStore.dispatch({
            type: 'FETCH_MAPPINGS',
        })

        passStore.dispatch({
            type: 'FETCH_IMAGES',
        })

        passStore.dispatch({
            type: 'FETCH_INFRA',
        })
        passStore.dispatch({
            type: 'FETCH_NETWORKGROUPS'
        })

        let currentValue
        passStore.subscribe(function(){
        let previousValue = currentValue;
        currentValue = passStore.getState()
        currentTab = window.location.hash.substr(1);
        if (JSON.stringify(previousValue) !== JSON.stringify(currentValue)) {
            if(currentTab == 'hosts') {
                    riot.update();
                }
            }
        })

        this.addHost = function() {
            passStore.dispatch({
                type: 'ADD_HOST',
                data: {
                    'server_group': document.getElementById('select-server-group').value
                    }
            })
            this.closeModal()
        }.bind(this)

        this.closeModal = function() {
            document.getElementById('modal-shadow').style.display = 'None';
        }.bind(this)
});
riot.tag2('table-dropdown', '<ul> <li> <a> {this.opts.top != null ? this.opts.top : ⁗None⁗} </a> <ul class="test"> <yield></yield> </ul> </li> </ul>', 'table-dropdown ul,[data-is="table-dropdown"] ul{ list-style: none; padding: 0; margin: 0; background: #FFF; color: #000; z-index: 9999; } table-dropdown ul li,[data-is="table-dropdown"] ul li{ display: block; position: relative; float: left; background: #FFF; color: #000; text-align: center; } table-dropdown ul li a,[data-is="table-dropdown"] ul li a{ display: block; text-decoration: none; white-space: nowrap; color: #000; cursor: pointer; } table-dropdown li ul,[data-is="table-dropdown"] li ul{ display: none; } table-dropdown li:hover > ul,[data-is="table-dropdown"] li:hover > ul{ display: block; position: absolute; } table-dropdown li:hover li,[data-is="table-dropdown"] li:hover li{ float: none; } table-dropdown li:hover a,[data-is="table-dropdown"] li:hover a{ background: #363c52; color: white; } table-dropdown li:hover li a:hover,[data-is="table-dropdown"] li:hover li a:hover{ background: rgba(74, 80, 100, 1); } table-dropdown ul.test,[data-is="table-dropdown"] ul.test{ top: -27px; } table-dropdown .test li,[data-is="table-dropdown"] .test li{ height: 32px; line-height: 32px; font-size: 12px } table-dropdown .test li a,[data-is="table-dropdown"] .test li a{ height: 32px; line-height: 32px; font-size: 11px; font-size: 1em; }', '', function(opts) {
});

riot.tag2('edit-serverimage', '<form> <div class="editmapping">Edit Mapping for: {translateOS(current_os)}</div> <fancy-dropdown name="ISO" tag="ISO" inputid="mapping-iso"> <option each="{img in passStore.getState().isos}" riot-value="{img}">{img.substring(0,60)}{img.length > 60 && ⁗...⁗}</option> </fancy-dropdown><br> </form> <fancy-button onclick="{createImageMapping}">Create</fancy-button> <fancy-button color="gray" onclick="{closeModal}">Cancel</fancy-button>', 'edit-serverimage form,[data-is="edit-serverimage"] form{ text-align: left; } edit-serverimage fancy-dropdown select,[data-is="edit-serverimage"] fancy-dropdown select{ width: 490px; } edit-serverimage .editmapping,[data-is="edit-serverimage"] .editmapping{ text-align: center; margin-top: 4px; }', '', function(opts) {
        passStore.dispatch({
            type: 'FETCH_IMAGES'
        })

        this.closeModal = function() {
            document.getElementById('modal-shadow').style.display = 'None';
        }.bind(this)

        this.createImageMapping = function() {
            passStore.dispatch({
                type: 'CREATE_IMGMAPPING',
                data: {
                    'name': current_os,
                    'iso': document.getElementById('mapping-iso').value
                }
            })
            this.closeModal()
        }.bind(this)
});
riot.tag2('new-serverimage', '<form> <fancy-dropdown tag="Operating System" inputid="mapping-name"> <option each="{key, value in passStore.getState().catalog}" riot-value="{value}">{translateOS(value)} </option> </fancy-dropdown> <fancy-dropdown name="ISO" tag="ISO" inputid="mapping-iso"> <option each="{img in passStore.getState().isos}" riot-value="{img}">{img.substring(0,60)}{img.length > 60 && ⁗...⁗}</option> </fancy-dropdown><br> </form> <fancy-button onclick="{createImageMapping}">Create</fancy-button> <fancy-button color="gray" onclick="{closeModal}">Cancel</fancy-button>', 'new-serverimage form,[data-is="new-serverimage"] form{ text-align: left; } new-serverimage fancy-dropdown select,[data-is="new-serverimage"] fancy-dropdown select{ width: 490px; }', '', function(opts) {
        passStore.dispatch({
            type: 'FETCH_IMAGES'
        })

        passStore.dispatch({
            type: 'FETCH_CATALOG'
        })

        this.closeModal = function() {
            document.getElementById('modal-shadow').style.display = 'None';
        }.bind(this)

        this.createImageMapping = function() {
            passStore.dispatch({
                type: 'CREATE_IMGMAPPING',
                data: {
                    'name': document.getElementById('mapping-name').value,
                    'iso': document.getElementById('mapping-iso').value
                }
            })
            this.closeModal()
        }.bind(this)
});
riot.tag2('serverimages-overview', '<div class="container"> <h2 class="categoryHeader">OS Images</h2> <table class="table table-bordered table-striped small"> <thead class="thead-dark"> <tr> <th scope="col">Operating System</th> <th scope="col">File</th> <th scope="col">Actions</th> </tr> </thead> <tbody> <tr each="{img in this.opts.store.getState().iso_map}"> <td>{translateOS(img.os)}</td> <td class="td">{img.file}</td> <td class="td actionwidth"> <img src="./icons/edit.svg" class="table-icon" data-os="{img.os}" onclick="{editServerimage}"> <img src="./icons/delete.svg" data-os="{img.os}" onclick="{deleteMapping}" class="table-icon"> </td> </tr> </tbody> </table> </div> <add-button onclick="{addServerimage}">Add new Image</add-button>', 'serverimages-overview .os-container,[data-is="serverimages-overview"] .os-container{ background-color: white; padding: 34px 20px; } serverimages-overview .osgroup,[data-is="serverimages-overview"] .osgroup{ margin-bottom: 25px; margin-right: 25px; float: left; width: 100%; } serverimages-overview .osselect,[data-is="serverimages-overview"] .osselect{ background-color: #363c51; font-size: 0.95em; color: white; border: 1px solid #ecedf1; padding: 10px; width: 580px; } serverimages-overview .centeralign,[data-is="serverimages-overview"] .centeralign{ text-align: center; } serverimages-overview .tablewidth,[data-is="serverimages-overview"] .tablewidth{ width: 600px; }', '', function(opts) {
        let store = this.opts.store
        console.log(this.opts.store.getState().iso_map)
        store.dispatch({
            type: 'FETCH_MAPPINGS'
        })

        this.addServerimage = function() {
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
        }.bind(this)

        this.editServerimage = function(e) {
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
        }.bind(this)

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

        this.deleteMapping = function(e) {
            ds = e.target.dataset;
            store.dispatch({
                type: 'DELETE_MAPPING',
                data: {
                    os: ds.os
                }
            })
        }.bind(this)

});




riot.tag2('infra-detail', '<div class="container"> <h2 class="categoryHeader">{name}</h2> <p>Select Servers to be used by KUBAM then save the changes</p> <div class="top-actions"> <button type="button" class="btn btn-secondary" data-infra="{name}" onclick="{saveComputeSelection}">Save Selections</button> </div> <table class="table table-bordered table-striped small"> <thead class="thead-dark"> <tr> <th scope="col"><input type="checkbox" id="selectAllCompute" onclick="{changeComputeSelection}"></th> <th scope="col">Server</th> <th scope="col">Server Type</th> <th scope="col">Model</th> <th scope="col">Service Profile</th> <th scope="col">Power</th> <th scope="col">CPU (count/cores)</th> <th scope="col">Memory (count/speed)</th> </tr> </thead> <tbody> <tr class="{\'table-primary\' : comp.selected === true}" each="{comp in this.opts.store.getState().compute}"> <td><input type="checkbox" data-dn="{comp.dn}" class="computeCheckBoxes" checked="{comp.selected}" onclick="{toggleCheckCompute}"></td> <td if="{comp.type === \'blade\'}"> {comp.chassis_id} / {comp.slot}</td> <td if="{comp.type === \'rack\'}"> {comp.rack_id} </td> <td>{comp.type}</td> <td>{comp.model}</td> <td if="{comp.association === \'none\'}"> Unassociated</td> <td if="{comp.association !== \'none\'}"> {comp.service_profile} </td> <td>{comp.oper_power} </td> <td>{comp.num_cpus} / {comp.num_cores}</td> <td>{comp.ram} / {comp.ram_speed}</td> </tr> </tbody> </table> </div>', '', '', function(opts) {

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
});

riot.tag2('infra-overview', '<div class="container"> <h2 class="categoryHeader">UCS Servers</h2> <table class="table table-bordered table-striped small"> <thead class="thead-dark"> <th scope="col">Name</th> <th scope="col">Description</th> <th scope="col">Type</th> <th scope="col">Mgmt IP</th> <th scope="col">User</th> <th scope="col">Actions</th> <thead> <tbody> <tr data-id="{comp.id}" each="{comp in this.opts.store.getState().servers}"> <td> <a if="{comp.type === ⁗imc⁗}">{comp.name}</a> <a if="{comp.type !== ⁗imc⁗}" href="#infrastructure/{comp.name}">{comp.name}</a> </td> <td> {comp.description} </td> <td>{comp.type}</td> <td> {comp.credentials.ip} </td> <td> {comp.credentials.user} </td> <td> <img src="./icons/delete.svg" data-type="{comp.type}" data-name="{comp.name}" onclick="{deleteController}" class="table-icon"> </td> </tr> </tbody> </table> </div> <add-button onclick="{addController}">Add Controller</add-button>', '', '', function(opts) {

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

        this.addController = function() {
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
        }.bind(this)

        this.deleteController = function(e) {
            ds = e.target.dataset;
            store.dispatch({
                type: 'DELETE_CONTROLLER',
                data: {
                    type: ds.type,
                    name: ds.name
                }
            })
        }.bind(this)

        this.editUCS = function(e) {
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
        }.bind(this)
});

riot.tag2('new-controller', '<div> <div class="form-container"> <fancy-dropdown tag="Type" inputid="srvgroup-new-type"> <option value="ucsm">UCS Manager</option> <option value="ucsc">UCS Central</option> <option value="imc">UCS Standalone</option> </fancy-dropdown> <div class="left-column"> <fancy-input tag="Name" inputid="srvgroup-new-name"> </fancy-input> <fancy-input tag="Description" inputid="srvgroup-new-description"> </fancy-input> <fancy-input tag="IP Address" inputid="srvgroup-new-ip"> </fancy-input> </div> <div class="right-column"> <fancy-input tag="Username" inputid="srvgroup-new-username"> </fancy-input> <fancy-input tag="Password" inputid="srvgroup-new-password" settype="password"> </fancy-input> </div> </div> <div class="bottombuttons"> <div> <fancy-button onclick="{createController}">Create</fancy-button> <fancy-button color="gray" onclick="{closeModal}">Cancel</fancy-button> </div> </div> </div>', 'new-controller { text-align: left; } new-controller .right-column,[data-is="new-controller"] .right-column{ float:left; margin-left: 20px; } new-controller .left-column,[data-is="new-controller"] .left-column{ float:left; } new-controller .bottombuttons,[data-is="new-controller"] .bottombuttons{ margin-top: 50px; }', '', function(opts) {
        this.closeModal = function() {
            document.getElementById('modal-shadow').style.display = 'None';
        }.bind(this)

        this.createController = function() {
            passStore.dispatch({
                type: 'CREATE_CONTROLLER',
                data: {
                    'type': document.getElementById('srvgroup-new-type').value,
                    'name': document.getElementById('srvgroup-new-name').value,
                    'description': document.getElementById('srvgroup-new-description').value,
                    'credentials': {
                        'user': document.getElementById('srvgroup-new-username').value,
                        'password': document.getElementById('srvgroup-new-password').value,
                        'ip': document.getElementById('srvgroup-new-ip').value
                    },

                }
            })
            this.closeModal()
        }.bind(this)
});

riot.tag2('network', '<div class="container table-responsive"> <h2 class="categoryHeader">Network Groups</h2> <table class="table table-bordered table-striped small"> <thead class="thead-dark"> <th scope="col">Network Name</div> <th scope="col">Netmask</div> <th scope="col">Router</div> <th scope="col">Name Server</div> <th scope="col">NTP Server</div> <th scope="col">Proxy Server</div> <th scope="col">VLAN</div> <th scope="col">Actions</div> </thead> <tbody> <tr data-id="{nw.id}" id="{nw.id}" each="{nw in this.opts.store.getState().networks}"> <td> <input class="form-control small" type="text" riot-value="{nw.name}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}"> </td> <td> <input class="form-control small" type="text" riot-value="{nw.netmask}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}"> </td> <td> <input class="form-control small" type="text" riot-value="{nw.gateway}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}"> </td> <td> <input class="form-control small" type="text" riot-value="{nw.nameserver}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}"> </td> <td> <input class="form-control small" type="text" riot-value="{nw.ntpserver}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}"> </td> <td> <input class="form-control small" type="text" riot-value="{nw.proxy}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}"> </td> <td> <input class="form-control small" type="text" riot-value="{nw.vlan}" data-name="{nw.name}" data-id="{nw.id}" onblur="{editNetwork}"> </td> <td> <img src="./icons/delete.svg" data-name="{nw.name}" onclick="{deleteNetwork}" class="table-icon"> </td> </tr> </tbody> </table> <add-button onclick="{addNetworkGroup}">Add Network Group</add-button> </div>', '', '', function(opts) {
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

        this.addNetworkGroup = function() {
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');

            modal_title.innerHTML = 'Add a new Network group'

            modal_content.innerHTML = '';
            var tag = document.createElement("new-networkgroup");
            modal_content.append(tag)
            riot.mount(tag, 'new-networkgroup');

            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }.bind(this)

        this.deleteNetwork = function(e) {
            ds = e.target.dataset;
            store.dispatch({
                type: 'DELETE_NETWORK',
                data: {
                    name: ds.name
                }
            })
        }.bind(this)

        this.editNetwork = function(e) {
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
        }.bind(this)
});

riot.tag2('new-networkgroup', '<form> <div class="network-container"> <fancy-input tag="Network Group Name" inputid="network-view-groupname" tip="Custom name for this network"> </fancy-input> <fancy-input tag="Netmask" inputid="network-view-netmask"> </fancy-input> <fancy-input tag="Router" inputid="network-view-router"> </fancy-input> <fancy-input tag="Name Server" inputid="network-view-nameserver"> </fancy-input> <fancy-input tag="NTP Server" inputid="network-view-ntp"> </fancy-input> <fancy-input tag="Proxy Server (optional)" inputid="network-view-proxy"> </fancy-input> <fancy-input tag="VLAN (optional)" inputid="network-view-vlan"> </fancy-input> </div> </form> <fancy-button onclick="{createNetworkGroup}">Create</fancy-button> <fancy-button color="gray" onclick="{closeModal}">Cancel</fancy-button>', 'new-networkgroup form,[data-is="new-networkgroup"] form{ text-align: left; align-items: left; }', '', function(opts) {

        this.closeModal = function() {
            document.getElementById('modal-shadow').style.display = 'None';
        }.bind(this)

        this.createNetworkGroup = function() {
            passStore.dispatch({
                type: 'CREATE_NETWORKGROUP',
                data: {
                    'name': document.getElementById('network-view-groupname').value,
                    'netmask': document.getElementById('network-view-netmask').value,
                    'gateway': document.getElementById('network-view-router').value,
                    'nameserver': document.getElementById('network-view-nameserver').value,
                    'ntpserver': document.getElementById('network-view-ntp').value,
                    'proxy': document.getElementById('network-view-proxy').value,
                    'vlan': document.getElementById('network-view-vlan').value
                }
            })
            this.closeModal()
        }.bind(this)
});
riot.tag2('new-servergroup', '<div class="newSvrGrpInputs"> <fancy-dropdown tag="Type" input-id="servergroup-new-type"> <option value="kubernetes">Kubernetes</option> <option value="hypervisor">Bare-metal Hypervisor</option> <option value="pureos">Bare-metal OS</option> </fancy-dropdown> <fancy-input tag="Name" input-id="servergroup-new-name"> </fancy-input> </div> <fancy-button onclick="{createServerGroup}">Create</fancy-button> <fancy-button color="gray" onclick="{closeModal}">Cancel</fancy-button>', 'new-servergroup { text-align: left; } new-servergroup .newSvrGrpInputs,[data-is="new-servergroup"] .newSvrGrpInputs{ margin-bottom: 4px; }', '', function(opts) {
        this.closeModal = function() {
            document.getElementById('modal-shadow').style.display = 'None';
        }.bind(this)

        this.createServerGroup = function() {
            console.log('a')
        }.bind(this)
});
riot.tag2('server-overview', '<div id="server-list"> <div class="servergroup clearfloat" each="{categories}"> <h1 class="categoryHeader serverCat">{type}</h1> <servergroup-box onclick="route(\'hosts/{group.id}\')" each="{group in groups}" id="{group.id}" name="{group.name}" green="{group.green}" yellow="{group.yellow}" red="{group.red}" gray="{group.gray}"> </servergroup-box> </div> </div> <add-button onclick="{createSvrGroup}">Create new Server Group</add-button>', 'server-overview ucs-content,[data-is="server-overview"] ucs-content{ padding: 10px; } server-overview .server-type,[data-is="server-overview"] .server-type{ font-size: 0.7em; font-style: italic; } server-overview .add-group,[data-is="server-overview"] .add-group{ font-size: 6.5em; color: rgb(41,182,246); } server-overview .svrGrpCreationDialog,[data-is="server-overview"] .svrGrpCreationDialog{ text-align: center; background-color: white; padding: 10px 50px; margin-bottom: 20px; } server-overview .svrGrpCreationDialog span,[data-is="server-overview"] .svrGrpCreationDialog span{ margin-right: 50px; } server-overview .servergroup,[data-is="server-overview"] .servergroup{ position: relative; overflow:auto; padding-bottom: 5px; }', '', function(opts) {

        categories = [
           {
               'type': 'Kubernetes',
               'groups': [
                   {
                       'id': 1,
                       'name': 'Kub Prod',
                       'green': 20,
                       'yellow': 1,
                       'red': 1,
                       'gray': 2
                   },
                   {
                       'id': 2,
                       'name': 'Kub Test',
                        'green': 5,
                       'yellow': 0,
                       'red': 1,
                       'gray': 0
                   },
                   {
                       'id': 3,
                       'name': 'Kub Dev',
                       'green': 4,
                       'yellow': 0,
                       'red': 0,
                       'gray': 0
                   }
               ]
           },
           {
               'type': 'Bare-metal Hypervisor Servers',
               'groups': [
                   {
                       'id': 4,
                       'name': 'VMware 1',
                       'green': 40,
                       'yellow': 2,
                       'red': 2,
                       'gray': 0
                   },
                   {
                       'id': 5,
                       'name': 'VMware 2',
                       'green': 10,
                       'yellow': 0,
                       'red': 1,
                       'gray': 0
                   }
               ]
           },
           {
               'type': 'Bare-metal OS Servers',
               'groups': [
                   {
                       'id': 6,
                       'name': 'Legacy CentOS Accounting',
                       'green': 2,
                       'yellow': 0,
                       'red': 0,
                       'gray': 0
                   },
                   {
                       'id': 7,
                       'name': 'Legacy CentOS Production',
                       'green': 4,
                       'yellow': 4,
                       'red': 0,
                       'gray': 0
                   }
               ]
           }
        ]

        this.createSvrGroup = function() {
            var promise = new Promise(function(resolve, reject) {

              if (true) {
                  setTimeout(resolve("Stuff worked!"), 5000000000);
              }
              else {
                reject(Error("It broke"));
              }
            });

            promise.then(function(y) {
                setTimeout(console.log(y), 5000);
            });

            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');

            modal_title.innerHTML = 'Add a new Servergroup'

            modal_content.innerHTML = '';
            var tag = document.createElement("new-servergroup");
            modal_content.append(tag)
            riot.mount(tag, 'new-servergroup');

            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }.bind(this)
});
riot.tag2('servergroup-box', '<div class="svrGrpBox"> <div class="svrGrpTitle"> {this.opts.name} </div> <div class="svrGrpStatus"> <div class="svrGrpStatBox {green: this.opts.green>0} {group-passive: this.opts.green==0}">{this.opts.green}</div> <div class="svrGrpStatBox {yellow: this.opts.yellow>0} {group-passive: this.opts.yellow==0}">{this.opts.yellow}</div> <div class="svrGrpStatBox {red: this.opts.red>0} {group-passive: this.opts.red==0}">{this.opts.red}</div> <div class="svrGrpStatBox {gray: this.opts.gray>0} {group-passive: this.opts.gray==0}">{this.opts.gray}</div> </div> </div>', 'servergroup-box .svrGrpBox,[data-is="servergroup-box"] .svrGrpBox{ width: 400px; background-color: white; box-shadow: 0 1px 3px 0px #cecece; border-radius: 5px; cursor: pointer; margin-bottom: 10px; margin-right: 20px; border: 2px solid white; position: relative; float: left; } servergroup-box .svrGrpBox:hover,[data-is="servergroup-box"] .svrGrpBox:hover{ border: 2px solid #b5b5b5; box-shadow: 0 1px 3px 0px #b5b5b5; } servergroup-box .svrGrpBox:active,[data-is="servergroup-box"] .svrGrpBox:active{ border: 2px solid #b5b5b5; box-shadow: 0 1px 3px 0px #b5b5b5; } servergroup-box .svrGrpTitle,[data-is="servergroup-box"] .svrGrpTitle{ height: 36px; line-height: 36px; border-bottom: 1px solid #d6d6d6; padding: 0 7px; position: relative; } servergroup-box .svrGrpStatus,[data-is="servergroup-box"] .svrGrpStatus{ height: 50px; line-height: 50px; } servergroup-box .svrGrpStatBox,[data-is="servergroup-box"] .svrGrpStatBox{ color: white; width: 80px; height: 34px; line-height: 34px; text-align: center; margin-top: 8px; margin-left: 16px; background-color: black; float: left; } servergroup-box .group-passive,[data-is="servergroup-box"] .group-passive{ background-color: rgb(220,220,220); } servergroup-box .green,[data-is="servergroup-box"] .green{ background-color: rgb(131, 209, 131); } servergroup-box .yellow,[data-is="servergroup-box"] .yellow{ background-color: rgb(255, 195, 91); } servergroup-box .red,[data-is="servergroup-box"] .red{ background-color: rgb(255, 160, 160); } servergroup-box .gray,[data-is="servergroup-box"] .gray{ background-color: rgb(168, 168, 168); }', '', function(opts) {
});
riot.tag2('servergroup-view', '<h1 class="categoryHeader">GROUPNAME</h1> <div class="svrGrpSettings"> <fancy-input tag="Subnet" inputid="servergroup-view-subnet" class="floatleft marginright25px"> </fancy-input> <fancy-input tag="Netmask" inputid="servergroup-view-netmask" class="floatleft marginright25px"> </fancy-input> <fancy-input tag="VLAN" inputid="servergroup-view-vlan" class="floatleft marginright25px"> </fancy-input> <fancy-input tag="Router" inputid="servergroup-view-router" class="floatleft marginright25px"> </fancy-input> <fancy-input tag="Nameserver" inputid="servergroup-view-nameserver" class="floatleft marginright25px"> </fancy-input> <fancy-input tag="NTP Server" inputid="servergroup-view-ntpserver" class="floatleft marginright25px"> </fancy-input> <fancy-input tag="Kubernetes Cluster [KUB]" inputid="servergroup-view-kubernetes" class="floatleft marginright25px"> </fancy-input> <fancy-dropdown tag="Operating System [KUB+BM]" inputid="servergroup-view-os" class="floatleft marginright25px"> <option value="volvo">Pick an OS</option> </fancy-dropdown> <fancy-dropdown tag="Hypervisor [HYP]" inputid="servergroup-view-hypervisor" class="floatleft marginright25px"> <option value="volvo">Pick a hypervisor</option> </fancy-dropdown> </div> <div class="svrGrpServers"> <table-search></table-search> <div class="table"> <div class="tr"> <div class="th"><input type="checkbox"></div> <div class="th">Hostname</div> <div class="th">IP</div> <div class="th">Role [KUB]</div> <div class="th">UCS Server</div> <div class="th">Action</div> </div> <div class="tr" each="{servers}"> <div class="td"> <input type="checkbox"> </div> <div class="td"> <fancy-input inputid="servergroup-view-table-hostname" class="table-input"> </fancy-input> </div> <div class="td"> <fancy-input inputid="servergroup-view-table-hostname" class="table-input"> </fancy-input> </div> <div class="td"> <fancy-dropdown inputid="servergroup-view-table-role" class="table-input"> <option value="none">Pick a Role</option> <option value="master">Master</option> <option value="worker">Worker</option> </fancy-dropdown> </div> <div class="td"> SERVER </div> <div class="td"> <img src="./icons/build.svg" class="table-icon"> <img src="./icons/deploy.svg" class="table-icon"> <img src="./icons/delete.svg" class="table-icon"> </div> </div> </div> <fancy-button> Commit </fancy-button> <add-button></add-button> </div>', 'servergroup-view { padding-bottom: 20px; } servergroup-view .svrGrpSettings,[data-is="servergroup-view"] .svrGrpSettings{ background-color: white; padding: 25px; margin-bottom: 20px; clear: both; overflow:auto; } servergroup-view .table-input,[data-is="servergroup-view"] .table-input{ margin: 0; } servergroup-view .marginright25px,[data-is="servergroup-view"] .marginright25px{ margin-right: 25px; } servergroup-view .svrGrpServers,[data-is="servergroup-view"] .svrGrpServers{ background-color: white; padding: 20px; overflow:auto; } servergroup-view .filter-input,[data-is="servergroup-view"] .filter-input{ background-color: white; padding: 10px; font-size: 0.9em; } servergroup-view .filter-input input,[data-is="servergroup-view"] .filter-input input{ border-width: 0 0 1px 0; border-color: gainsboro; border-style: solid; width: 400px; margin-bottom: 5px; } servergroup-view .filter-input input:active,[data-is="servergroup-view"] .filter-input input:active,servergroup-view .filter-input input:focus,[data-is="servergroup-view"] .filter-input input:focus{ border-color: rgb(41,182,246); } servergroup-view .filter-input input:focus,[data-is="servergroup-view"] .filter-input input:focus{ outline: none; }', '', function(opts) {
        servers = ['a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b']
});
riot.tag2('edit-setting', '<div class="settings-container"> <fancy-textarea tag="Public Key" inputid="settings-view-key"> </fancy-textarea> </div> <fancy-button onclick="{editPublicKey}">Create</fancy-button> <fancy-button color="gray" onclick="{closeModal}">Cancel</fancy-button>', 'edit-setting .settings-container,[data-is="edit-setting"] .settings-container{ text-align: left; align-items: left; } edit-setting fancy-textarea textarea,[data-is="edit-setting"] fancy-textarea textarea{ width:520px; height:120px; }', '', function(opts) {
        this.closeModal = function() {
            document.getElementById('modal-shadow').style.display = 'None';
        }.bind(this)

        this.editPublicKey = function() {
            passStore.dispatch({
                type: 'EDIT_PUBLICKEY',
                data: {
                    'new_key': document.getElementById('settings-view-key').value,
                    'old_key': current_key
            }})
            this.closeModal()
        }.bind(this)
});
riot.tag2('new-setting', '<div class="settings-container"> <fancy-textarea tag="Public Key" inputid="settings-view-key"> </fancy-textarea> </div> <fancy-button onclick="{addPublicKey}">Create</fancy-button> <fancy-button color="gray" onclick="{closeModal}">Cancel</fancy-button>', 'new-setting .settings-container,[data-is="new-setting"] .settings-container{ text-align: left; align-items: left; } new-setting fancy-textarea textarea,[data-is="new-setting"] fancy-textarea textarea{ width:520px; height:120px; }', '', function(opts) {
        this.closeModal = function() {
            document.getElementById('modal-shadow').style.display = 'None';
        }.bind(this)

        this.addPublicKey = function() {
            passStore.dispatch({
                type: 'ADD_PUBLICKEY',
                data: {
                    'key': document.getElementById('settings-view-key').value
            }})
            this.closeModal()
        }.bind(this)
});
riot.tag2('settings', '<div class="container table-responsive"> <h2 class="categoryHeader">Settings</h2> <div class="input-group mb-3"> <div class="input-group-prepend"> <span class="input-group-text">KUBAM IP</span> </div> <input type="text" class="form-control" inputid="settings-view-ip" riot-value="{this.opts.store.getState().kubam_ip}" tip="This is the IP from which the servers will load the Vmedia. Usually it is the same IP as the web interface"> <button class="btn btn-outline-secondary" onclick="{updateIP}" type="button">Update</button> </div> <table class="table table-bordered table-striped keywidthtablelimit small"> <thead class="thead-dark"> <tr> <th scope="col" width="90%">Public Keys</th> <th scope="col">Actions</th> </tr> </thead> <tbody> <tr each="{k in this.opts.store.getState().keys}"> <td><span class="small">{k}</span></td> <td> <img src="./icons/edit.svg" class="table-icon" data-id="{k}" onclick="{editSetting}"> <img src="./icons/delete.svg" data-id="{k}" onclick="{deleteKey}" class="table-icon"> </td> </tr> </tbody> </table> </div> <add-button onclick="{addSetting}"> Add Setting </add-button>', 'settings .keywidthtablelimit,[data-is="settings"] .keywidthtablelimit{ width: 100%; word-wrap: break-word; table-layout: fixed; }', '', function(opts) {
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

        this.updateIP = function() {
            var new_ip = document.getElementById('settings-view-ip').value
            store.dispatch({
                type: 'UPDATE_IP',
                data: {
                    kubam_ip: new_ip
                }
            })
        }.bind(this)

        this.addSetting = function() {
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');

            modal_title.innerHTML = 'Add New Public Key'

            modal_content.innerHTML = '';
            var tag = document.createElement("new-setting");
            modal_content.append(tag)
            riot.mount(tag, 'new-setting');

            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }.bind(this)

        this.editSetting = function(e) {
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
        }.bind(this)

        this.deleteKey = function(e) {
            ds = e.target.dataset;
            store.dispatch({
                type: 'DELETE_KEY',
                data: {
                    id: ds.id
                }
            })
        }.bind(this)
});

riot.tag2('tutorial', '<form> <h5>Welcome to KUBAM. In the following links you will find all the necessary information to get started using our project.</h5> <hr> <div> <b>Youtube Demo:</b> <fancy-button class="btn btn-success" onclick=" window.open(\'http://www.youtube.com/watch?v=7QCrml8C-QI\',\'_blank\')"> Go </fancy-button> <hr> <b>dCloud Tutorial. Lab Steps:</b> <fancy-button class="btn btn-success" onclick=" window.open(\'https://github.com/vallard/KUBAM-Tutorial/blob/master/README.md\',\'_blank\')"> Go </fancy-button> <hr> <b>dCloud: Cisco Unified Computing System 3.2 v1 - DEV:</b> <fancy-button class="btn btn-success" onclick=" window.open(\'https://dcloud2-lon.cisco.com/dashboard/sessions\',\'_blank\')"> Go </fancy-button> <hr> <h5> Please, make sure to schedule the lab properly and once it is scheduled, click on View to start it. We hope you enjoy your KUBaM experience! </h5> </div> </form>', 'tutorial-content{ padding: 10px; position: fixed; } tutorial h5,[data-is="tutorial"] h5{ font-size: 12px; color:gray; font-weight: 400; padding-top: 5px; background-color: white; padding-left: 7px; padding-right: 7px; } tutorial form,[data-is="tutorial"] form{ margin-top: 8px; text-align: left; vertical-align: left; background-color: white; padding-top: 30px; padding-left: 45px; padding-right: 45px; padding-bottom: 30px; font-size: 14px; } tutorial fancy-button,[data-is="tutorial"] fancy-button{ margin-left: 10px; }', '', function(opts) {
});
riot.tag2('content', '<main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4"> <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"> <loading-spinner if="{this.opts.store.getState().isLoading}"></loading-spinner> <router> <route path="/images"> <serverimages-overview store="{passStore}"></serverimages-overview> </route> <route path="/infrastructure"> <infra-overview store="{passStore}"></infra-overview> </route> <route path="/infrastructure/*"> <infra-detail store="{passStore}"></infra-detail> </route> <route path="/hosts"> <hosts store="{passStore}"></hosts> </route> <route path="/network"> <network store="{passStore}"></network> </route> <route path="/settings"> <settings store="{passStore}"></settings> </route> <route path="/feedback"> <feedback store="{passStore}"></feedback> </route> <route path="/tutorial"> <tutorial store="{passStore}"></tutorial> </route> </router> <div id="modal-shadow" style="display:none;"> <div id="modal-container"> <div id="modal-box"> <modal></modal> </div> </div> </div> <div id="pop-box"> </div> </div> </main>', 'content #modal-shadow,[data-is="content"] #modal-shadow{ position: fixed; display: table; top: 0; left: 0; height: 100%; width: 100%; z-index: 9999; background-color: rgba(0,0,0,0.6); } content #modal-container,[data-is="content"] #modal-container{ display:table-cell; text-align:center; padding-top: 5%; } content #modal-box,[data-is="content"] #modal-box{ position: relative; display: inline-block; background-color: white; border-radius: 4px; padding: 34px; } content #pop-box,[data-is="content"] #pop-box{ position: fixed; top: 70px; right: 25px; width: 340px; }', 'class="main"', function(opts) {
        passStore = this.opts.store
});

riot.tag2('dashboard-box', '<div class="dashGrpBox"> <div class="dashGrpTitle"> {this.opts.name} </div> <div class="dashGrpStatus"> <div class="dashGrpStatBox {green: this.opts.green>0} {group-passive: this.opts.green==0}">{this.opts.green}</div> <div class="dashGrpStatBox {yellow: this.opts.yellow>0} {group-passive: this.opts.yellow==0}">{this.opts.yellow}</div> <div class="dashGrpStatBox {red: this.opts.red>0} {group-passive: this.opts.red==0}">{this.opts.red}</div> <div class="dashGrpStatBox {gray: this.opts.gray>0} {group-passive: this.opts.gray==0}">{this.opts.gray}</div> </div> </div>', 'dashboard-box .dashGrpBox,[data-is="dashboard-box"] .dashGrpBox{ width: 400px; background-color: white; box-shadow: 0 1px 3px 0px #cecece; border-radius: 5px; cursor: pointer; margin-bottom: 10px; margin-right: 20px; border: 2px solid white; position: relative; float: left; } dashboard-box .dashGrpTitle,[data-is="dashboard-box"] .dashGrpTitle{ height: 36px; line-height: 36px; border-bottom: 1px solid #d6d6d6; padding: 0 7px; position: relative; } dashboard-box .dashGrpStatus,[data-is="dashboard-box"] .dashGrpStatus{ height: 50px; line-height: 50px; } dashboard-box .dashGrpStatBox,[data-is="dashboard-box"] .dashGrpStatBox{ color: white; width: 80px; height: 34px; line-height: 34px; text-align: center; margin-top: 8px; margin-left: 16px; background-color: black; float: left; } dashboard-box .group-passive,[data-is="dashboard-box"] .group-passive{ background-color: rgb(220,220,220); } dashboard-box .green,[data-is="dashboard-box"] .green{ background-color: rgb(131, 209, 131); } dashboard-box .yellow,[data-is="dashboard-box"] .yellow{ background-color: rgb(255, 195, 91); } dashboard-box .red,[data-is="dashboard-box"] .red{ background-color: rgb(255, 160, 160); } dashboard-box .gray,[data-is="dashboard-box"] .gray{ background-color: rgb(168, 168, 168); }', '', function(opts) {
});  
riot.tag2('dashboard', '<div id="server-health"> <div class="servergroup clearfloat" each="{categories}"> <h1 class="categoryHeader serverCat">{type}</h1> <servergroup-box each="{group in groups}" id="{group.id}" name="{group.name}" green="{group.green}" yellow="{group.yellow}" red="{group.red}" gray="{group.gray}"> </servergroup-box> </div> </div>', 'dashboard ucs-content,[data-is="dashboard"] ucs-content{ padding: 10px; } dashboard .server-type,[data-is="dashboard"] .server-type{ font-size: 0.7em; font-style: italic; } dashboard .add-group,[data-is="dashboard"] .add-group{ font-size: 6.5em; color: rgb(41,182,246); } dashboard .svrGrpCreationDialog,[data-is="dashboard"] .svrGrpCreationDialog{ text-align: center; background-color: white; padding: 10px 50px; margin-bottom: 20px; } dashboard .svrGrpCreationDialog span,[data-is="dashboard"] .svrGrpCreationDialog span{ margin-right: 50px; } dashboard .servergroup,[data-is="dashboard"] .servergroup{ position: relative; overflow:auto; padding-bottom: 5px; }', '', function(opts) {

        categories = [
           {
               'type': '',
               'groups': [
                   {
                       'id': 1,
                       'name': 'Kubernetes',
                       'green': 20,
                       'yellow': 1,
                       'red': 1,
                       'gray': 2
                   }
               ]
           },
           {
               'type': '',
               'groups': [
                   {
                       'id': 4,
                       'name': 'Bare-metal Hypervisor Servers',
                       'green': 40,
                       'yellow': 2,
                       'red': 2,
                       'gray': 0
                   }
               ]
           },
           {
               'type': '',
               'groups': [
                   {
                       'id': 6,
                       'name': 'Bare-metal OS Servers',
                       'green': 2,
                       'yellow': 0,
                       'red': 0,
                       'gray': 0
                   }
               ]
           }
        ]

        this.createSvrGroup = function() {
            var promise = new Promise(function(resolve, reject) {

              if (true) {
                  setTimeout(resolve("Stuff worked!"), 5000000000);
              }
              else {
                reject(Error("It broke"));
              }
            });

            promise.then(function(y) {
                setTimeout(console.log(y), 5000);
            });

            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');

            modal_title.innerHTML = 'Add a new Servergroup'

            modal_content.innerHTML = '';
            var tag = document.createElement("new-servergroup");
            modal_content.append(tag)
            riot.mount(tag, 'new-servergroup');

            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }.bind(this)
});
riot.tag2('add-button', '<div class="button-container"> <div class="plus-icon"></div> </div>', 'add-button .button-container,[data-is="add-button"] .button-container{ background-color: rgb(41,182,246); color: white; font-size: 28px; border-radius: 999px; width: 50px; height: 50px; cursor: pointer; position: fixed; right: 28px; bottom: 50px; } add-button .button-container:hover,[data-is="add-button"] .button-container:hover{ background-color: rgb(40, 153, 230); } add-button .plus-icon,[data-is="add-button"] .plus-icon{ height: 50px; width: 50px; background: url(\'icons/plus_icon.png\') no-repeat center center; }', '', function(opts) {
});
riot.tag2('fancy-box', '<div class="fancy-box"> <yield></yield> </div>', 'fancy-box .fancy-box,[data-is="fancy-box"] .fancy-box{ background-color: #FFFFFF; box-shadow: 0 1px 3px 0px #cecece; box-sizing: border-box; float: left; width: 160px; height: 160px; line-height: 160px; border-radius: 5px; margin-right: 20px; text-align: center; vertical-align: middle; cursor: pointer; border: 2px solid rgb(255,255,255); } fancy-box .fancy-box:hover,[data-is="fancy-box"] .fancy-box:hover{ border: 2px solid rgb(41,182,246); box-shadow: 0 1px 3px 0px #29b6f6; } fancy-box .fancy-box:active,[data-is="fancy-box"] .fancy-box:active{ border: 2px solid rgb(41,182,246); box-shadow: 0 1px 3px 0px #29b6f6; }', '', function(opts) {
});
riot.tag2('fancy-button', '<button class="{opts.color}" type="button"> <yield></yield> </button>', 'fancy-button button,[data-is="fancy-button"] button{ background-color: rgb(41,182,246); color: #FFFFFF; border: none; height: 40px; line-height: 28px; font-size: 14px; font-weight: 100; margin: 5px; padding: 0 15px; min-width: 100px; border-radius: 12px; cursor: pointer; } fancy-button button:hover,[data-is="fancy-button"] button:hover{ background-color: rgb(40, 153, 230); color: #FFFFFF; border: none; } fancy-button button:active,[data-is="fancy-button"] button:active{ background-color: rgb(35, 140, 211); color: #FFFFFF; border: none; } fancy-button button:visited,[data-is="fancy-button"] button:visited{ background-color: rgb(35, 140, 211); color: #FFFFFF; border: none; } fancy-button button:focus,[data-is="fancy-button"] button:focus{ outline:0; } fancy-button .red,[data-is="fancy-button"] .red{ background-color: rgb(212, 0, 0); } fancy-button .red:hover,[data-is="fancy-button"] .red:hover{ background-color: rgb(190, 0, 0); } fancy-button .red:active,[data-is="fancy-button"] .red:active{ background-color: rgb(170, 0, 0); } fancy-button .gray,[data-is="fancy-button"] .gray{ background-color: rgb(150, 150, 150); } fancy-button .gray:hover,[data-is="fancy-button"] .gray:hover{ background-color: rgb(135, 135, 135); } fancy-button .gray:active,[data-is="fancy-button"] .gray:active{ background-color: rgb(135, 135, 135); }', '', function(opts) {
});
riot.tag2('fancy-dropdown', '<div data-tip="{this.opts.tip}"> <label for="{this.opts.inputid}">{this.opts.tag}</label> </div> <select name="{this.opts.inputid}" id="{this.opts.inputid}" onchange="{this.opts.changefunc}"> <yield></yield> </select>', 'fancy-dropdown { margin: 10px; } fancy-dropdown select,[data-is="fancy-dropdown"] select,fancy-dropdown label,[data-is="fancy-dropdown"] label{ display:block; } fancy-dropdown select,[data-is="fancy-dropdown"] select{ color: #54596c; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; width: 225px; padding: 12px; text-overflow: ellipsis; padding: 5px 10px; white-space: nowrap; -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1); -webkit-appearance: button; -webkit-padding-start: 12px; -webkit-user-select: none; background-image: url(\'./icons/select_arrow.png\'); background-position: 96% center; background-repeat: no-repeat; } fancy-dropdown select:hover,[data-is="fancy-dropdown"] select:hover,fancy-dropdown select:active,[data-is="fancy-dropdown"] select:active,fancy-dropdown select:focus,[data-is="fancy-dropdown"] select:focus{ outline: none; } fancy-dropdown label,[data-is="fancy-dropdown"] label{ font-size: 12px; color: #8089a2; margin-bottom: 2px; }', '', function(opts) {
});

riot.tag2('fancy-input', '<div data-tip="{this.opts.tip}"> <label for="{this.opts.inputid}">{this.opts.tag}</label> </div> <input id="{this.opts.inputid}" name="{this.opts.inputid}" type="{this.opts.settype}" placeholder="{this.opts.placeholder}">', 'fancy-input { margin: 10px; } fancy-input input,[data-is="fancy-input"] input,fancy-input label,[data-is="fancy-input"] label{ display:block; } fancy-input input,[data-is="fancy-input"] input{ padding: 12px; color: #54596c; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; width: 200px; } fancy-input input:hover,[data-is="fancy-input"] input:hover,fancy-input input:active,[data-is="fancy-input"] input:active,fancy-input input:focus,[data-is="fancy-input"] input:focus{ outline: none; border: 1px solid #20B4F6; } fancy-input label,[data-is="fancy-input"] label{ font-size: 12px; color: #8089a2; margin-bottom: 2px; }', '', function(opts) {
});
riot.tag2('fancy-table', '<div class="table"><yield></yield></div>', 'fancy-table .table,[data-is="fancy-table"] .table,fancy-table .tr,[data-is="fancy-table"] .tr,fancy-table .th,[data-is="fancy-table"] .th,fancy-table .td,[data-is="fancy-table"] .td{ border: 1px solid #ecedf1; background-color: #FFF; } fancy-table .th,[data-is="fancy-table"] .th,fancy-table .td,[data-is="fancy-table"] .td{ padding: 12px; font-size: 0.8em; } fancy-table .th,[data-is="fancy-table"] .th{ background-color: #363c51; color: #FFF; font-weight: 100; }', '', function(opts) {
});
riot.tag2('fancy-textarea', '<div data-tip="{this.opts.tip}"> <label for="{this.opts.inputid}">{this.opts.tag}</label> </div> <textarea rows="4" cols="60" name="{this.opts.inputid}" id="{this.opts.inputid}"></textarea>', 'fancy-textarea { margin: 10px; } fancy-textarea textarea,[data-is="fancy-textarea"] textarea,fancy-textarea label,[data-is="fancy-textarea"] label{ display:block; } fancy-textarea textarea,[data-is="fancy-textarea"] textarea{ padding: 12px; color: #54596c; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; width: 200px; } fancy-textarea textarea:hover,[data-is="fancy-textarea"] textarea:hover,fancy-textarea textarea:active,[data-is="fancy-textarea"] textarea:active,fancy-textarea textarea:focus,[data-is="fancy-textarea"] textarea:focus{ outline: none; border: 1px solid #20B4F6; } fancy-textarea label,[data-is="fancy-textarea"] label{ font-size: 12px; color: #8089a2; margin-bottom: 2px; }', '', function(opts) {
});
riot.tag2('table-search', '<div class="table-search-container"> <img src="./icons/search.png"> <input type="text" class="search form-control" placeholder="Search"> </div>', 'table-search .table-search-container,[data-is="table-search"] .table-search-container{ margin-bottom: 2px; } table-search input,[data-is="table-search"] input{ border: none; border-bottom: 1px solid gray; font-size: 14px; width: 94%; } table-search input:focus,[data-is="table-search"] input:focus{ outline: none; } table-search img,[data-is="table-search"] img{ margin-left: 8px; margin-bottom: -4px; height: 16px; width: 16px; }', '', function(opts) {
});
riot.tag2('alert', '<div class="pop-up pop-{opts.type}"> <yield></yield> </div>', 'alert .pop-up,[data-is="alert"] .pop-up{ height: 40px; line-height: 40px; padding-left: 15px; color: white; font-size: 0.85em; border-radius: 8px; margin-bottom: 10px; } alert .pop-success,[data-is="alert"] .pop-success{ background-color: #66BB6A; } alert .pop-error,[data-is="alert"] .pop-error{ background-color: #EF4F52; }', '', function(opts) {
        var timeout = window.setTimeout(fadeOut, 6000, this.root);

        function fadeOut(el) {
            el.parentNode.removeChild(el);
        }
});
riot.tag2('loading-spinner', '<img src="icons/loader.gif" alt="Loading">', 'loading-spinner img,[data-is="loading-spinner"] img{ margin-left: 15px; margin-top: 15px; }', '', function(opts) {
});
riot.tag2('modal', '<div> <div id="close-modal">x</div> <div id="modal-title"></div> <div id="modal-content"> <yield></yield> </div> </div>', 'modal #close-modal,[data-is="modal"] #close-modal{ position: absolute; right: 10px; top: 10px; display: inline-block; cursor: pointer; font-size: 1.05em; color: gray; } modal #modal-title,[data-is="modal"] #modal-title{ font-weight: 500; font-size: 18px; padding-top: 9px; padding-bottom: 18px; }', '', function(opts) {
        window.addEventListener('load',function(){
            document.getElementById("close-modal").addEventListener("click", closeModal);
        });

        function closeModal() {
            document.getElementById('modal-shadow').style.display = 'None';
        }
});
riot.tag2('side-bar', '<nav class="col-md-2 d-none d-md-block bg-dark sidebar"> <div class="sidebar-sticky"> <ul class="nav flex-column"> <li each="{menu}" onclick="route(\'{route}\')" class="sidebar-item" id="{route}-selector"> <div class="colorbar" style="background-color: #363c52;"></div> <img class="sidebar-image" riot-src="{img}"> <div class="sidebar-title">{title}</div> </li> </ul> </div> </nav>', 'side-bar{ color: white; left: 0; } side-bar .sidebar-item:hover,[data-is="side-bar"] .sidebar-item:hover{ background-color: rgba(255,255,255,0.06); } side-bar .sidebar-title,[data-is="side-bar"] .sidebar-title{ padding-top: 5px; } side-bar .colorbar,[data-is="side-bar"] .colorbar{ width: 4px; height: 42px; float: left; top: 0; } side-bar .sidebar-item,[data-is="side-bar"] .sidebar-item{ float: none; font-size:0.95em; height: 42px; line-height: 32px; cursor: pointer; } side-bar .sidebar-image,[data-is="side-bar"] .sidebar-image{ float: left; width: 1.5em; padding-right: 4px; box-sizing: none; padding-top: .7em; margin-left: 5px; margin-right: 5px; } side-bar .sidebar,[data-is="side-bar"] .sidebar{ padding-right: 0px; padding-left: 0px; }', '', function(opts) {
        menu=[
            { title: "Hosts", img:"./icons/host.png", route:"hosts" },
            { title: "Network",img:"./icons/network.png", route:"network" },
            { title: "Images",img:"./icons/serverimage.png", route:"images" },
            { title: "Infrastructure", img:"./icons/ucs.png", route:"infrastructure" },
            { title: "Settings", img:"./icons/settings.png", route:"settings" },
            { title: "Feedback", img:"./icons/feedback.png", route:"feedback" }
        ];

        route(function(id) {
            colorbars = document.getElementsByClassName('colorbar')

            for(i=0;i<colorbars.length;i++) {
                colorbars[i].style.backgroundColor = '';
            }

            for(i=0;i<menu.length;i++) {
                el = document.getElementById(menu[i].route + '-selector');
                el.style.backgroundColor = '';
            }

            if(id=="") {
                id = "images"
            }

            if(id=="tutorial") {

            } else {
                id = id + '-selector'
                parent = document.getElementById(id)

                parent.style.backgroundColor = 'rgba(255,255,255,0.1)'

                target = parent.getElementsByClassName("colorbar")[0];
                target.style.backgroundColor = '#2ab6f6';
            }
        })
});




riot.tag2('top-bar', '<nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0"> <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#hosts"> <img src="icons/cisco.png"> &nbsp; &nbsp; &nbsp; KUBAM </a> <span class="navbar-text mr-auto" id="currentpage"> &nbsp; &nbsp; <router> <route path="network..">Network Groups</route> <route path="images..">Server Images</route> <route path="infrastructure">Infrastructure</route> <route path="infrastructure/*"><inner-tag></inner-tag></route> <route path="hosts..">Hosts</route> <route path="settings..">Settings</route> <route path="tutorial..">Tutorial</route> <route path="feedback..">Feedback</route> </router> </span> <ul class="navbar-nav ml-auto"> <li class="nav-item"> <a href="https://ciscoucs.github.io/kubam"> <img src="icons/tutorial.png"> </a> </li> <li class="nav-item"> <a href="https://github.com/CiscoUcs/KUBaM"> <img src="icons/github.png"> </a> </li> </ul> </nav>', '', '', function(opts) {
});

riot.tag2('inner-tag', '<p class="topb"><a href="#infrastructure" onclick="route(\'infrastructure\')">Infrastructure</a> | {name}</p>', '', '', function(opts) {
    this.on('route', name => this.name = name)
});

<new-controller>
    <div>
        <div class="form-container">
            <fancy-dropdown tag="Type"
                            inputid="srvgroup-new-type">
                <option value="ucsm">UCS Manager</option>
                <option value="imc">UCS Standalone</option>
                <!--<option value="aci">ACI Fabric</option>-->
            </fancy-dropdown>

            <div class="left-column">
                <fancy-input tag="Name"
                             inputid="srvgroup-new-name">
                </fancy-input>
                <fancy-input tag="Description"
                             inputid="srvgroup-new-description">
                </fancy-input>
                <fancy-input tag="IP Address"
                             inputid="srvgroup-new-ip">
                </fancy-input>
            </div>

            <div class="right-column">
                <fancy-input tag="Username"
                             inputid="srvgroup-new-username">
                </fancy-input>
                <fancy-input tag="Password"
                             inputid="srvgroup-new-password"
                             settype="password">
                </fancy-input>
                <!--<fancy-input tag="Tenant (ACI)"
                             inputid="srvgroup-new-tenant">
                </fancy-input>
                <fancy-input tag="VRF (ACI)"
                             inputid="srvgroup-new-vrf">
                </fancy-input>
                <fancy-input tag="Bridge Domain (ACI)"
                             inputid="srvgroup-new-bridgedomain">
                </fancy-input>-->
            </div>
        
        
        </div>
        <div class="bottombuttons">
            <div>
                <fancy-button onclick={createController}>Create</fancy-button>
                <fancy-button color="gray" onclick={closeModal}>Cancel</fancy-button>
            </div>
        </div>

    </div>
 
    
    <script>
        closeModal() {
            document.getElementById('modal-shadow').style.display = 'None';
        }
        
        createController() {
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
                    'aci': {
                        'tenant_name': document.getElementById('srvgroup-new-tenant').value,
                        'vrf_name': document.getElementById('srvgroup-new-vrf').value,
                        'bridge_domain': document.getElementById('srvgroup-new-bridgedomain').value
                    },
                }
            })
            this.closeModal()
        }
    </script>
    
    <style>
        new-controller {
            text-align: left;
        }
        .right-column{
            float:left;
            margin-left: 20px;
        }
        .left-column{
            float:left;
        }
        
        .bottombuttons {
            margin-top: 50px;
        }
    </style>
</new-controller>
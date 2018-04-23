<infra-overview>
    <div class="infra-group">
        <h1 class="categoryHeader">KUBAM Settings</h1>
        <div class="infra-container">
            <fancy-input tag="KUBAM IP Address"
                         inputid="infra-view-kubamip">
            </fancy-input>
            <fancy-input tag="Proxy Server"
                         inputid="infra-view-proxy">
            </fancy-input>
            <hr />
            <fancy-button>Change Public Key</fancy-button>
        </div>
    </div>
    
    <div class="infra-group"> 
            <div class="infra-container-big">
                <table-search></table-search>
                <div class="table">
                    <div class="tr">
                        <div class="th"><input type="checkbox">
                        </div>
                        <div class="th">Type</div>
                        <div class="th">Health</div>
                        <div class="th">Management IP</div>
                        <div class="th">Tenant</div>
                        <div class="th">Model</div>
                        <div class="th">Firmware version</div>
                        <div class="th">Description</div>
                        <div class="th">Action</div>
                    </div>
                    <div class="tr" each={content}>
                        <div class="td"><input type="checkbox"></div>
                        <div class="td">{type}</div>
                        <div class="td">{health}</div>
                        <div class="td">{mgtip}</div>
                        <div class="td">{tenant}</div>
                        <div class="td">{model}</div>
                        <div class="td">{firmware}</div>
                        <div class="td">{description}</div>
                        <div class="td">
                                 <img src="./icons/edit.svg" class="table-icon">
                                 <img src="./icons/delete.svg" class="table-icon">
                        </div>
                    </div>
                </div>
            </div>
    </div>
    
    
    <add-button onclick={addController}>Add Controller</add-button>
    
    <style>
        .tablewidth {
            width: 720px;
        }
        
        .infra-group {
            padding-bottom: 15px;
        }
        
        .infra-container {
            background-color: white;
            padding: 20px;
        }
        
        
        .infra-container-big {
            background-color: white;
            padding: 34px 20px;
        }
    </style>
    
    <script>
        
        this.content=[
            {
                'type': 'UCS Manager',
                'health': 'UP',
                'mgtip': '64.101.169.13',
                'tenant': 'Michael M.',
                'model': 'UCS-M.6248UP',
                'firmware': '...',
                'description': 'Austria'
            },
            {
                'type': 'ACI',
                'health': 'DOWN',
                'mgtip': '64.101.169.13',
                'tenant': 'Lara',
                'model': '...',
                'firmware': '...',
                'description': 'Spain'
            }
        ]
        
        addController() {
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');
            
            modal_title.innerHTML = 'Add a new Controller';
            
            modal_content.innerHTML = '';
            var tag = document.createElement("new-controller");
            modal_content.append(tag)
            riot.mount(tag, 'new-controller');
            
            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }
    </script>
</infra-overview>
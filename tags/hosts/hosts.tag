<hosts>
    
    <div class="svrGrpServers">
        <div class="top-actions">
            <fancy-dropdown inputid="actions" class="table-input">
                <option value="none">Actions</option>
                <option value="buildimage">Build Image</option>
                <option value="deploy">Deploy</option>    
            </fancy-dropdown>
        </div>

       <table-search></table-search>
        <div class="table">
            <div class="tr">
                <div class="th checkbox_width">
                    <input type="checkbox" id="select_all" onclick={changeSelection}>     
                </div>
                <div class="th">Server</div>
                <div class="th hostname_width">Hostname</div>
                <div class="th dropdown_width">Operating System</div>
                <div class="th dropdown_width">Network</div>
                <div class="th ip_width">Server IP</div>
            </div>
            <div class="tr" each={host in this.opts.store.getState().hosts}>
                <div class="td-host checkbox_width">
                    <input type="checkbox" class="hostcheckboxes">
                </div>
                <div class="td-host">Servergroup Servername</div>
                <div class="td-host hostname_width">
                    <input type="text" placeholder="{host.name}" />
                </div>
                <div class="td-host dropdown_width">
                    <ul class="main-navigation">
                        <li><a href="#">No OS selected</a>
                            <ul>
                                <li><a href="#">Windows 2016</a></li>
                                <li><a href="#">RedHat</a>
                                    <ul>
                                        <li><a href="#">No Kubernetes</a></li>
                                        <li><a href="#">Kubernetes Master</a></li>
                                        <li><a href="#">Kubernetes Worker</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">CentOS</a>
                                    <ul>
                                        <li><a href="#">No Kubernetes</a></li>
                                        <li><a href="#">Kubernetes Master</a></li>
                                        <li><a href="#">Kubernetes Worker</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="td-host dropdown_width">
                    <ul class="main-navigation">
                        <li><a href="#">No Network selected</a>
                            <ul>
                                <li><a href="#">Network 1</a></li>
                                <li><a href="#">Network 2</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="td-host ip_width">
                    <input type="text" placeholder="{host.ip}" />
                </div>
            </div>
        </div>
        
    <add-button onclick={addHost}>Add Host</add-button>
    
    <script>
        let currentValue
        let store = this.opts.store
        
        addHost() {
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');
            
            modal_title.innerHTML = 'Add a new Host'
            
            modal_content.innerHTML = '';
            var tag = document.createElement("new-host");
            modal_content.append(tag)
            store = this.opts.store
            riot.mount(tag, 'new-host', store);
            
            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }
                
        passStore.dispatch({
            type: 'FETCH_HOSTS'
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
        
        deleteHost(e) {
            ds = e.target.dataset;
            store.dispatch({
                type: 'DELETE_HOST',
                data: ds.hostname
            })
        }
        closeModal() {
            document.getElementById('modal-shadow').style.display = 'None';
        }

        changeSelection() {
            hostcheckboxes = document.getElementsByClassName('hostcheckboxes')
            topbox = document.getElementById('select_all')
            for(i=0;i<hostcheckboxes.length;i++) {
                if(topbox.checked==true){
                hostcheckboxes[i].checked = true
                }
                else{
                    hostcheckboxes[i].checked = false
                }
            }
        }
    </script>
    
    <style>
        /* BASE TABLE DESIGN */
        .td-host {
            padding: 0;
            font-size: 0.8em;
            display: table-cell;
            border: 1px solid #ecedf1;
            background-color: #FFF;
        }
        
        /* TABLE WIDTHS */
        .checkbox_width {
            width: 20px;
        }
        
        .hostname_width {
            width: 140px;
        }
        
        .ip_width {
            width: 120px;
        }
        
        .dropdown_width {
            width: 136px;
        }
        
        /* TABLE INPUT HOVER */
        .hostname_width input:hover, .ip_width input:hover {
            background-image: url('icons/edit.svg');
            background-repeat: no-repeat;
            background-position: right;
        }
        
        .hostname_width input:focus, ip_width input:focus {
            background-image: none;
        }

        
        
        
        
        
        .top-actions {
            margin-bottom: 15px;
        }
        
        .svrGrpSettings {
            background-color: white;
            padding: 25px;
            margin-bottom: 20px;
            clear: both;
            overflow:auto;
        }
        
        .svrGrpServers {
            background-color: white;
            padding: 20px;
            overflow: hidden;
            min-height: 400px;
        }
        
        .table input[type=text] {
            border: none;
            outline:0;
            height: 45px;
            width: 90%;
            line-height: 45px;
            padding: 0;
            padding-left: 8px;
            margin: 0;
            font-size: 1em;
            cursor: pointer;
        }

        
        
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          background: #FFF;
          color: #000;
          width: 160px;
          z-index: 9999;
        }

        ul li {
          display: block;
          position: relative;
          float: left;
          background: #FFF;
          color: #000;
          text-align: center;
          width: 160px;
          /*background-image: url('icons/select_arrow.png');
          background-repeat: no-repeat;
          background-position: right;*/
        }
        
        li ul { display: none; }

        ul li a {
          height: 45px;
          line-height: 45px;
          display: block;
          text-decoration: none;
          white-space: nowrap;
          color: #000;
        }

        ul li a:hover { background: rgba(74, 80, 100, 1); }
        
        li:hover > ul {
          display: block;
          position: absolute;
        }

        li:hover li { float: none; }

        li:hover a {
            background: #363c52;
            color: white;
        }

        li:hover li a:hover { background: rgba(74, 80, 100, 1); }

        .main-navigation li ul li { border-top: 0; }
        
        ul ul ul {
            left: 100%;
            top: 0;
        }
        
        ul:before,
        ul:after {
          content: " "; /* 1 */
          display: table; /* 2 */
        }

        ul:after { clear: both; }
    </style>
</hosts>

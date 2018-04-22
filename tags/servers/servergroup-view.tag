<servergroup-view>
    <h1 class="categoryHeader">GROUPNAME</h1>
    <div class="svrGrpSettings">
        <fancy-input tag="Subnet"
                     inputid="servergroup-view-subnet"
                     class="floatleft marginright25px">
        </fancy-input>
        <fancy-input tag="Netmask"
                     inputid="servergroup-view-netmask"
                     class="floatleft marginright25px">
        </fancy-input>
        <fancy-input tag="VLAN"
                     inputid="servergroup-view-vlan"
                     class="floatleft marginright25px">
        </fancy-input>
        <fancy-input tag="Router"
                     inputid="servergroup-view-router"
                     class="floatleft marginright25px">
        </fancy-input>
        <fancy-input tag="Nameserver"
                     inputid="servergroup-view-nameserver"
                     class="floatleft marginright25px">
        </fancy-input>
        <fancy-input tag="NTP Server"
                     inputid="servergroup-view-ntpserver"
                     class="floatleft marginright25px">
        </fancy-input>
        <fancy-input tag="Kubernetes Cluster [KUB]"
                     inputid="servergroup-view-kubernetes"
                     class="floatleft marginright25px">
        </fancy-input>
        <fancy-dropdown tag="Operating System [KUB+BM]"
                        inputid="servergroup-view-os"
                        class="floatleft marginright25px">
            <option value="volvo">Pick an OS</option>
        </fancy-dropdown>
        <fancy-dropdown tag="Hypervisor [HYP]"
                        inputid="servergroup-view-hypervisor"
                        class="floatleft marginright25px">
            <option value="volvo">Pick a hypervisor</option>
        </fancy-dropdown>
    </div>
    
    <div class="svrGrpServers">
        <table-search></table-search>
        <div class="table">
            <div class="tr">
                <div class="th"><input type="checkbox"></div>
                <div class="th">Hostname</div>
                <div class="th">IP</div>
                <div class="th">Role [KUB]</div>
                <div class="th">UCS Server</div>
                <div class="th">Action</div>
            </div>
            <div class="tr" each={servers}>
                <div class="td">
                    <input type="checkbox">
                </div>
                <div class="td">
                    <fancy-input inputid="servergroup-view-table-hostname" class="table-input">
                    </fancy-input>
                </div>
                <div class="td">
                    <fancy-input inputid="servergroup-view-table-hostname" class="table-input">
                    </fancy-input>
                </div>
                <div class="td">
                    <fancy-dropdown inputid="servergroup-view-table-role" class="table-input">
                        <option value="none">Pick a Role</option>
                        <option value="master">Master</option>
                        <option value="worker">Worker</option>
                    </fancy-dropdown>
                </div>
                <div class="td">
                    SERVER
                </div>
                <div class="td">
                    <img src="./icons/build.svg" class="table-icon">
                    <img src="./icons/deploy.svg" class="table-icon">
                    <img src="./icons/delete.svg" class="table-icon">
                </div>
            </div>
        </div>
        
        <fancy-button>
            Commit
        </fancy-button>
        
        <add-button></add-button>
    </div>
    
    <script>
        servers = ['a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b','a','b']
    </script>
    
    <style>
        servergroup-view {
            padding-bottom: 20px;
        }
        
        .svrGrpSettings {
            background-color: white;
            padding: 25px;
            margin-bottom: 20px;
            clear: both;
            overflow:auto;
        }
        
        .table-input {
            margin: 0;
        }
        
        .marginright25px {
            margin-right: 25px;
        }
        
        .svrGrpServers {
            background-color: white;
            padding: 20px;
            overflow:auto;
        }
        
        .filter-input {
            background-color: white;
            padding: 10px;
            font-size: 0.9em;
        }
        
        .filter-input input {
            border-width: 0 0 1px 0;
            border-color: gainsboro;
            border-style: solid;
            width: 400px;
            margin-bottom: 5px;
        }
        
        .filter-input input:active, .filter-input input:focus {
            border-color: rgb(41,182,246);
        }
        
        .filter-input input:focus {
            outline: none;
        }
    </style>
</servergroup-view>
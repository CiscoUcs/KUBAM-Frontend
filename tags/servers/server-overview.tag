<server-overview>
    <div id="server-list">
        <div class="servergroup clearfloat" each={categories}>
            <h1 class="categoryHeader serverCat">{type}</h1>
            <servergroup-box onclick="route('hosts/{group.id}')"
                             each="{group in groups}"
                             id={group.id}
                             name={group.name} 
                             green={group.green} 
                             yellow={group.yellow} 
                             red={group.red} 
                             gray={group.gray}
                             >
            </servergroup-box>
        </div>
    </div>
    <add-button onclick={createSvrGroup}>Create new Server Group</add-button>
    
    <script>        
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
        
        createSvrGroup() {
            var promise = new Promise(function(resolve, reject) {
              // do a thing, possibly async, then…
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
        }
    </script>
            
    <style>        
        ucs-content {
            padding: 10px;
            
        }
        
        .server-type {
            font-size: 0.7em;
            font-style: italic;
        }
        
        .add-group {
            font-size: 6.5em;
            color: rgb(41,182,246);
        }
        
        .svrGrpCreationDialog {
            text-align: center;
            background-color: white;
            padding: 10px 50px;
            margin-bottom: 20px;
        }
        
        .svrGrpCreationDialog span {
            margin-right: 50px;
        }
        
        .servergroup {
            position: relative;
            overflow:auto;
            padding-bottom: 5px;
        }
    </style>
</server-overview>
<dashboard>
    <div id="server-health">
        <div class="servergroup clearfloat" each={categories}>
            <h1 class="categoryHeader serverCat">{type}</h1>
            <servergroup-box 
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
    
    <script>        
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
</dashboard>
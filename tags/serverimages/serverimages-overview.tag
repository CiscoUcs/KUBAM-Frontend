<serverimages-overview> 
    <div class="osgroup" hide={this.opts.store.getState().isLoading}>
            <div class="os-container">
                <div class="table">
                    <div class="tr">
                        <!--<div class="th"><input type="checkbox"></div>-->
                        <div class="th">Name</div>
                        <div class="th">ISO</div>
                        <div class="th actionwidth">Actions</div>
                    </div>
                    <div class="tr" each={img in this.opts.store.getState().iso_map}> 
                        <div class="td">{resolveName(img.os)}</div>
                        <div class="td">{img.file}</div>
                        <div class="td actionwidth">
                            <!--<img src="./icons/edit.svg" class="table-icon">-->
                            <img src="./icons/delete.svg" data-os={img.os} onclick={deleteMapping} class="table-icon">
                        </div>
                    </div>
                </div>
            </div>
    </div>

    <add-button onclick={addServerimage}>Add new Image</add-button>
    
    <style>
        .os-container {
            background-color: white;
            padding: 34px 20px;
        }
        
        .osgroup {
            margin-bottom: 25px;
            margin-right: 25px;
            float: left;
            width: 100%;
        }
        
        .osselect {
            background-color: #363c51;
            font-size: 0.95em;
            color: white;
            border: 1px solid #ecedf1;
            padding: 10px;
            width: 580px;
        }
        
        .centeralign {
            text-align: center;
        }
        
        .tablewidth {
            width: 600px;
        }
    </style>
    
    <script>
        let store = this.opts.store
        
        store.dispatch({
            type: 'FETCH_MAPPINGS'
        })
    
        addServerimage() {
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
        }
        
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
        
        deleteMapping(e) {
            ds = e.target.dataset;
            store.dispatch({
                type: 'DELETE_MAPPING',
                data: {
                    os: ds.os
                }
            })
        }
        
        resolveName(x) {
            switch(x) {
                case 'esxi6.5': return 'ESXi 6.5'
                case 'centos7.3': return 'CentOS 7.3'
                case 'centos7.4': return 'CentOS 7.4'
                case 'win2012': return 'Windows 2012'
                case 'win2016': return 'Windows 2016'
                case 'redhat7.2': return 'Red Hat 7.2'
                case 'redhat7.2': return 'Red Hat 7.3'
                case 'redhat7.2': return 'Red Hat 7.4'
                default: return x
            }
        }
    </script>
</serverimages-overview>




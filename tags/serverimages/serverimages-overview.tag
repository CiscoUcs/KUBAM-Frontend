<serverimages-overview>        
    <div class="osgroup" hide={this.opts.store.getState().isLoading}>
        <div class="os-container">
            <table-search></table-search>
            <div class="table">
                <div class="tr">
                    <div class="th"><input type="checkbox"></div>
                    <div class="th">Group name</div>
                    <div class="th">Name</div>
                    <div class="th">Version</div>
                    <div class="th">Size</div>
                    <div class="th">Action</div>
                </div>
                <div class="tr" each={img in this.opts.store.getState().images}> 
                    <div class="td"><input type="checkbox"></div>
                    <div class="td">GROUPNAME</div>
                    <div class="td">{img}</div>
                    <div class="td">VERSION</div>
                    <div class="td">SIZE</div>
                    <div class="td">
                        <img src="./icons/edit.svg" class="table-icon">
                        <img src="./icons/delete.svg" class="table-icon">
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
        let currentValue
        let store = this.opts.store
        
        store.dispatch({
            type: 'FLUSH'
        })
        
        store.dispatch({
            type: 'FETCH_IMAGES'
        })

    
        addServerimage() {
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');
            
            modal_title.innerHTML = 'Add a new Image'
            
            modal_content.innerHTML = '';
            var tag = document.createElement("new-serverimage");
            modal_content.append(tag)
            riot.mount(tag, 'new-serverimage');
            
            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }
        
        this.opts.store.subscribe(function(){
            let previousValue = currentValue;
            currentValue = store.getState()
            console.log(this)
            if (previousValue !== currentValue) {
                riot.update();
            }
        })
    </script>
</serverimages-overview>




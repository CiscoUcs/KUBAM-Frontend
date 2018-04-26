<settings>
    <div class="settings-group"> 
            <div class="settings-container-big">
<!--                <table-search></table-search>-->
                <div class="table">
                    <div class="tr">
                        <div class="th">KUBAM IP Address</div>
                        <div class="th">Public Key</div>
                    </div>
                    <div class="tr" each={setting in this.opts.store.getState().settings}>
                        <div class="td">{ip}</div>
                        <div class="td">{public_key}</div>
                    </div>
                </div>
            </div>
    </div>
    
    <add-button onclick={addSetting}>
        Add Setting
    </add-button>

    
    <style>
        .settings-group {
            padding-bottom: 15px;
            background-color: white;
             padding: 20px;
        }
        
        .settings-container {
            background-color: white;
            padding: 20px;
        }
    </style>
    
    <script>
        addSetting() {
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');
            
            modal_title.innerHTML = 'Add new KUBAM setting'
            
            modal_content.innerHTML = '';
            var tag = document.createElement("new-setting");
            modal_content.append(tag)
            riot.mount(tag, 'new-setting');
            
            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }
    </script>
    
</settings>
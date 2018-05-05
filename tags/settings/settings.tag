<settings>    
    <div class="settings-group">
            <fancy-input tag="KUBAM IP Address"
                inputid="settings-view-ip">
            </fancy-input>
            <fancy-button>Update</fancy-button>
            <div class="settings-container-big">
                <!--                <table-search></table-search>-->
                <div class="table">
                    <div class="tr">
                        <div class="th">Public Keys</div>
                    </div>
                    <div class="tr" each={k in this.opts.store.getState().keys}>
                        <div class="td">{k.key}</div>
                    </div>
                </div>
            </div>
    </div>
    
    <add-button onclick={addSetting}>
        Add Setting
    </add-button>

    
    <style>
        .settings-group {
            padding: 15px;
            margin-bottom: 10px;
            background-color: white;
        }
        
        fancy-input {
            position: relative;
            float: left;
            top: -10px;
        }
        
        fancy-button{
            position: relative;
            top: 10px;
         }
    </style>
    
    <script>
        addSetting() {
            var modal_title = document.getElementById('modal-title');
            var modal_content = document.getElementById('modal-content');
            
            modal_title.innerHTML = 'Add New Public Key'
            
            modal_content.innerHTML = '';
            var tag = document.createElement("new-setting");
            modal_content.append(tag)
            riot.mount(tag, 'new-setting');
            
            var modal_shadow = document.getElementById('modal-shadow')
            modal_shadow.style.display = 'table'
        }
    </script>
    
</settings>

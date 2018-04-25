<settings>
<div class="settings-group">
        <h1 class="categoryHeader">Settings</h1>
        <div class="settings-container">
            <fancy-input tag="KUBAM IP Address"
                         inputid="settings-view-ip">
            </fancy-input>
            <fancy-input tag="Public Key"
                         inputid="settings-view-key">
            </fancy-input>
        </div>
        
        <hr />
    
        <div class="settings-group"> 
                <div class="settings-container-big">
                    <table-search></table-search>
                    <div class="table">
                        <div class="tr">
                            <div class="th">KUBAM IP Address</div>
                            <div class="th">Public Key</div>
                        </div>
                        <div class="tr">
                           <div class="td"></div>
                            <div class="td"></div>
                        </div>
                    </div>
                </div>
        </div>
    
    </div>
    
    <add-button onclick={createSvrGroup}>Create new Server Group</add-button>

    
    <style>
        .settings-group {
            padding-bottom: 15px;
        }
        
        .settings-container {
            background-color: white;
            padding: 20px;
        }
    </style>
    
</settings>
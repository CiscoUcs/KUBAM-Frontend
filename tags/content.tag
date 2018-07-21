<content>
    <loading-spinner if="{this.opts.store.getState().isLoading}"></loading-spinner>
    
    <router>
        <!-- **** Server Images **** -->
        <route path="/images">
            <serverimages-overview store={passStore}></serverimages-overview>
        </route>
        
        <!-- **** Infrastructure **** -->
        <route path="/infrastructure">
            <infra-overview store={passStore}></infra-overview>
        </route>

        <route path="/infrastructure/*">
            <infra-detail store={passStore}></infra-detail>
        </route>
        
        <!-- **** Hosts **** -->
        <route path="/hosts">
            <hosts store={passStore}></hosts>
        </route>
        
        <!-- **** Network **** -->
        <route path="/network">
            <network store={passStore}></network>
        </route>
        
        <!-- **** Settings **** -->
        <route path="/settings">
            <settings store={passStore}></settings>
        </route>
        
        <!-- **** Feedback **** -->
        <route path="/feedback">
            <feedback store={passStore}></feedback>
        </route>
        
        <!-- **** Tutorial **** -->
        <route path="/tutorial">
            <tutorial store={passStore}></tutorial>
        </route>
    </router>
    
    <div id="modal-shadow" style="display:none;">
        <div id="modal-container">
            <div id="modal-box">
                <modal></modal>
            </div>
        </div>
    </div>
    
    <div id="pop-box">
    </div>
        
    <style>
        content {
            position: absolute;
            left: 200px;
            top: 50px;
            padding: 10px;
            width: calc(100% - 200px);
        }
        
        #modal-shadow {
            position: fixed;
            display: table;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            z-index: 9999;
            background-color: rgba(0,0,0,0.6);
        }
        
        #modal-container {
            display:table-cell;
            text-align:center;
            padding-top: 5%;
        }
        
        #modal-box {
            position: relative;
            display: inline-block;
            background-color: white;
            border-radius: 4px;
            padding: 34px;
        }
        
        #pop-box {
            position: fixed;
            top: 70px;
            right: 25px;
            width: 340px;
        }
    </style>
    
    <script>
        passStore = this.opts.store
    </script>
</content>

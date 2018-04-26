<top-bar>
    <div id="top-bar">
        <div id="logo">
            KUBAM
        </div>
        
        <div id="currentpage">
            <router>
                <route path="network..">Network Groups</route>
                <route path="images..">Server Images</route>
                <route path="infrastructure..">Infrastructure</route>
                <route path="hosts..">Hosts</route>
                <route path="settings..">Settings</route>
                <route path="tutorial..">Tutorial</route>
                <route path="feedback..">Feedback</route>
            </router>
        </div>
        
        <div id="topright">
            <div id="tutorial" onclick="route('tutorial')"></div>
            <div id="github" onclick="window.open('https://github.com/CiscoUcs/KUBaM')"></div>
        </div>
    </div>

    <style>
        #top-bar{
            background-color: #292d3e;
            color: white;
            height: 50px;
            line-height: 50px;
            position: fixed;
            left:0;
            z-index: 20;
            width: 100%;
        }
        
        #logo{
            background: url(./icons/cisco.png) no-repeat center left 28px;
            background-color: rgba(0,0,0,0.28);
            width: 100px;
            height: 50px;
            line-height: 55px;
            font-size: 1em;
            vertical-align: middle;
            padding-left: 100px;
            float: left;
        }
        
        #currentpage {
            margin-left: 228px;
            font-size: 0.8em;
            line-height: 52px;
        }
        
        #topright {
            position: absolute;
            top: 0;
            right: 0;
            height: 50px;
            border-left: 1px solid rgba(255,255,255,0.2);
        }
        
        #tutorial{
            cursor: pointer;
            background: url(./icons/tutorial.png) no-repeat center center;
            width: 24px;
            height: 50px;
            padding-left: 12px;
            padding-right: 12px;
            float: left;
            border-right: 1px solid rgba(255,255,255,0.2);
        }
        
        #github {
            cursor: pointer;
            background: url(./icons/github.png) no-repeat center center;
            width: 24px;
            height: 50px;
            padding-left: 12px;
            padding-right: 12px;
            float: left;
        }
    </style>
</top-bar>
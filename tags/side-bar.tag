<side-bar>    
    <div each={menu} onclick="route('{route}')" class='sidebar-item' id='{route}-selector'>
        <div class="colorbar" style="background-color: #363c52;"></div>
        <img class="sidebar-image" src='{img}'>
        <div class="sidebar-title">{title}</div>
    </div>
 
    <script>
        menu=[
        { title: "Server images",img:"./icons/serverimage.png", route:"images" },
        { title: "Infrastructure", img:"./icons/ucs.png", route:"infrastructure" },
        { title: "Hosts", img:"./icons/host.png", route:"hosts" },
        { title: "Network",img:"./icons/network.png", route:"network" },
        { title: "Settings", img:"./icons/settings.png", route:"settings" },
        { title: "Feedback", img:"./icons/feedback.png", route:"feedback" }
        ];
        
        route(function(id) {
            colorbars = document.getElementsByClassName('colorbar')

            for(i=0;i<colorbars.length;i++) {
                colorbars[i].style.backgroundColor = '';
            }
            
            for(i=0;i<menu.length;i++) {
                el = document.getElementById(menu[i].route + '-selector');
                el.style.backgroundColor = '';
            }
            
            if(id=="") {
                id = "images"
            }
            
            if(id=="tutorial") {
                //No action
            } else {
                id = id + '-selector'
                parent = document.getElementById(id)

                parent.style.backgroundColor = 'rgba(255,255,255,0.1)'

                target = parent.getElementsByClassName("colorbar")[0];
                target.style.backgroundColor = '#2ab6f6';
            }
        })
    </script>
    
    <style>
        side-bar{
            background-color: #363c52;
            color: white;
            width: 200px;
            height: 100%;
            position: fixed;
            z-index: 10;
            top: 0;
            left: 0;
            padding-top: 50px;
        }
        
        .sidebar-item {
            float: none;
            font-size:0.95em;
            height: 42px;
            line-height: 32px;
            cursor: pointer;
        }
        
        .sidebar-item:hover {
            background-color: rgba(255,255,255,0.06);
        }
        
        .colorbar {
            width: 4px;
            height: 42px;
            float: left;
            top: 0;
        }
                
        .sidebar-image {
            float: left;
            padding-right: 5px;
            width: 18px;
            height: 18px;
            padding-top: 12px;
            padding-left: 14px;
            padding-right: 14px;
        }
        
        .sidebar-title {
            padding-top: 5px;
        }
    </style>
</side-bar>




<add-button>
    <div class="button-container">
        <div class="plus-icon"></div>
        <!--<yield />-->
    </div>
    
    <style>
        .button-container {
            background-color: rgb(41,182,246);
            color: white;
            font-size: 28px;
            border-radius: 999px;
            width: 50px;
            height: 50px;
            cursor: pointer;
            position: fixed;
            right: 28px;
            bottom: 50px;
        }
        
        .button-container:hover {
            background-color: rgb(40, 153, 230);  
        }
        
        .plus-icon {
            height: 50px;
            width: 50px;
            background: url('icons/plus_icon.png') no-repeat center center;   
        }
    </style>
</add-button>
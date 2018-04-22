<fancy-box>
    <div class="fancy-box">
        <yield/>
    </div>
    
    <style>
        .fancy-box {
            background-color: #FFFFFF;
            box-shadow: 0 1px 3px 0px #cecece;
            box-sizing: border-box;
            float: left;
            width: 160px;
            height: 160px;
            line-height: 160px;
            border-radius: 5px;
            margin-right: 20px;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            border: 2px solid rgb(255,255,255);
        }
        
        .fancy-box:hover {
            border: 2px solid rgb(41,182,246);
            box-shadow: 0 1px 3px 0px #29b6f6;
        }
        
        .fancy-box:active {
            border: 2px solid rgb(41,182,246);
            box-shadow: 0 1px 3px 0px #29b6f6;
        }
    </style>
</fancy-box>
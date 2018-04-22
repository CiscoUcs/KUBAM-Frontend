<fancy-button>
    <button class="{opts.color}" type="button">
        <yield />
    </button>
    
    <style>
        button {
            background-color: rgb(41,182,246);
            color: #FFFFFF;
            border: none;
            height: 40px;
            line-height: 28px;
            font-size: 14px;
            font-weight: 100;
            margin: 5px;
            padding: 0 15px;
            min-width: 100px;
            border-radius: 12px;
            cursor: pointer;
        }
        
        button:hover {
            background-color: rgb(40, 153, 230);
            color: #FFFFFF;
            border: none;
        }
        
        button:active {
            background-color: rgb(35, 140, 211);
            color: #FFFFFF;
            border: none;
        }
        
        button:visited {
            background-color: rgb(35, 140, 211);
            color: #FFFFFF;
            border: none;
        }
        
        button:focus {
            outline:0;
        }
        
        .red {
            background-color: rgb(212, 0, 0);
        }
        
        .red:hover {
            background-color: rgb(190, 0, 0);
        }
        .red:active {
            background-color: rgb(170, 0, 0);
        }
        
        .gray {
            background-color: rgb(150, 150, 150);
        }
        
        .gray:hover {
            background-color: rgb(135, 135, 135);
        }
        .gray:active {
            background-color: rgb(135, 135, 135);
        }
    </style>
</fancy-button>
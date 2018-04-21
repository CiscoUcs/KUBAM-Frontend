<servergroup-box>
    <div class="svrGrpBox">
        <div class="svrGrpTitle">
            {this.opts.name}
        </div>
        <div class="svrGrpStatus">
            <div class="svrGrpStatBox {green: this.opts.green>0} {group-passive: this.opts.green==0}">{this.opts.green}</div>
            <div class="svrGrpStatBox {yellow: this.opts.yellow>0} {group-passive: this.opts.yellow==0}">{this.opts.yellow}</div>
            <div class="svrGrpStatBox {red: this.opts.red>0} {group-passive: this.opts.red==0}">{this.opts.red}</div>
            <div class="svrGrpStatBox {gray: this.opts.gray>0} {group-passive: this.opts.gray==0}">{this.opts.gray}</div>
        </div>
    </div>
    
    <script>
    </script>
    
    <style>
        .svrGrpBox {
            width: 400px;
            background-color: white;
            box-shadow: 0 1px 3px 0px #cecece;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 10px;
            margin-right: 20px;
            border: 2px solid white;
            position: relative;
            float: left;
        }
        
        .svrGrpBox:hover {
            border: 2px solid #b5b5b5;
            box-shadow: 0 1px 3px 0px #b5b5b5;
        }
        
        .svrGrpBox:active {
            border: 2px solid #b5b5b5;
            box-shadow: 0 1px 3px 0px #b5b5b5;
        }
        
        .svrGrpTitle {
            height: 36px;
            line-height: 36px;
            border-bottom: 1px solid #d6d6d6;
            padding: 0 7px;
            position: relative;
        }
        
        .svrGrpStatus {
            height: 50px;
            line-height: 50px;
        }
        
        .svrGrpStatBox {
            color: white;
            width: 80px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            margin-top: 8px;
            margin-left: 16px;
            background-color: black;
            float: left;
        }
        
        .group-passive {
            background-color: rgb(220,220,220);
        }
        
        .green {
            background-color: rgb(131, 209, 131);
        }
        
        .yellow {
            background-color: rgb(255, 195, 91);
        }
        
        .red {
            background-color: rgb(255, 160, 160);
        }
        
        .gray {
            background-color: rgb(168, 168, 168);
        }
    </style>
</servergroup-box>
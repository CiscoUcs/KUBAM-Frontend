<fancy-dropdown>
    <div data-tip="{this.opts.tip}">
        <label for="{this.opts.inputid}">{this.opts.tag}</label>
    </div>
    <select name="{this.opts.inputid}" id="{this.opts.inputid}" onchange={this.opts.changefunc}>
        <yield />
    </select>
    
    <style>
        fancy-dropdown {
            margin: 10px;
        }
        
        select, label {
            display:block;
        }
        
        select {
            color: #54596c;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            width: 225px;
            padding: 12px;
            text-overflow: ellipsis;
            padding: 5px 10px;
            white-space: nowrap;
            -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
            -webkit-appearance: button;
            -webkit-padding-start: 12px;
            -webkit-user-select: none; 
            background-image: url('./icons/select_arrow.png');
            background-position: 96% center;
            background-repeat: no-repeat;
        }
        
        select:hover, select:active, select:focus {
            outline: none;
        }
        
        label {
            font-size: 12px;
            color: #8089a2;
            margin-bottom: 2px;
        }
    </style>
</fancy-dropdown>

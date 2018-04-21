<fancy-input>
    <label for="{this.opts.inputid}">{this.opts.tag}</label>
    <input type="text" id="{this.opts.inputid}" name="{this.opts.inputid}" />
    
    <style>
        fancy-input {
            margin: 10px;
        }
        
        input, label {
            display:block;
        }
        
        input {
            padding: 12px;
            color: #54596c;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            width: 200px;
        }
        
        input:hover, input:active, input:focus {
            outline: none;
            border: 1px solid #20B4F6;
        }
        
        label {
            font-size: 12px;
            color: #8089a2;
            margin-bottom: 2px;
        }
    </style>
</fancy-input>
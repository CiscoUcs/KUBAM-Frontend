<fancy-textarea>
    <label for="{this.opts.inputid}">{this.opts.tag}</label>
    <textarea rows="4" cols="60" name="{this.opts.inputid}" id="{this.opts.inputid}"></textarea>
    
    <style>
        fancy-textarea {
            margin: 10px;
        }
        
        textarea, label {
            display:block;
        }
        
        textarea {
            padding: 12px;
            color: #54596c;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            width: 200px;
        }
        
        textarea:hover, textarea:active, textarea:focus {
            outline: none;
            border: 1px solid #20B4F6;
        }
        
        label {
            font-size: 12px;
            color: #8089a2;
            margin-bottom: 2px;
        }
    </style>
</fancy-textarea>
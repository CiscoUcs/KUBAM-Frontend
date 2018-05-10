<alert>
    <div class="pop-up pop-{ opts.type }">
        <yield />
    </div>
    
    <script>
        var timeout = window.setTimeout(fadeOut, 6000, this.root);
        
        function fadeOut(el) {
            el.parentNode.removeChild(el);
        }
    </script>
    
    <style>
        .pop-up {
            height: 40px;
            line-height: 40px;
            padding-left: 15px;
            color: white;
            font-size: 0.85em;
            border-radius: 8px;
            margin-bottom: 10px;
        }
        
        .pop-success {
            background-color: #66BB6A;
        }
        
        .pop-error {
            background-color: #EF4F52;
        }
    </style>
</alert>
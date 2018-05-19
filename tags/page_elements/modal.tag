<modal>
    <div>
        <div id="close-modal">x</div>
        <div id="modal-title"></div>
        <div id="modal-content">
            <yield />
        </div>
    </div>
    
    <script>
        window.addEventListener('load',function(){
            document.getElementById("close-modal").addEventListener("click", closeModal);
        });
        
        function closeModal() {
            document.getElementById('modal-shadow').style.display = 'None';
        }
    </script>
    
    <style>
        #close-modal {
            position: absolute;
            right: 10px;
            top: 10px;
            display: inline-block;
            cursor: pointer;
            font-size: 1.05em;
            color: gray;
        }
        
        #modal-title {
            font-weight: 500;
            font-size: 18px;
            padding-top: 9px;
            padding-bottom: 18px;
        }
    </style>
</modal>
<app>
    <top-bar store={this.opts.store}></top-bar>
    <side-bar store={this.opts.store}></side-bar>
    <content store={this.opts.store}></content>
    
    <script>        
//        let currentValue
//        this.opts.store.subscribe(function () {
//            this.state = this.opts.store.getState();
//            let previousValue = currentValue;
//            currentValue = this.opts.store.getState();
//            if (previousValue !== currentValue) {
//                riot.update();
//            }
//        }.bind(this));
    </script>
</app>

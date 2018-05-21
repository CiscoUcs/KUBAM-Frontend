<table-dropdown>
    <ul class="main-navigation">
            <li><a>
                    <div class="{this.opts.add == "" ? 'onelines' : 'twolines'}">
                        <span class="top_show">
                            {this.opts.top != "" ? this.opts.top : this.opts.default}
                        </span><br />
                        <span class="add_show" if={this.opts.add != ""}>
                            {this.opts.add}
                        </span>
                    </div>                    
                </a>
                <ul class="test">
                    <yield />
                </ul>
            </li>
    </ul>
    
    <script>
        switch_network(e) {
            ds = e.target.dataset;
            this.root.setAttribute("top", ds.nw)
        }
        
        switch_os(e) {
            ds = e.target.dataset;
            this.root.setAttribute("top", translateOS(ds.os))
            this.root.setAttribute("add", translateRole(ds.role))
        }
    </script>
    
    <style>
        .twolines {
            padding-top: 8px;
            line-height: 14px;
        }
        
        .oneline {
            line-height: 45px;
        }
        
        .top_show {
            font-size: 16px;
        }
        
        .add_show {
            font-size: 11px;
        }
        
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          background: #FFF;
          color: #000;
          width: 160px;
          z-index: 9999;
        }

        ul li {
          display: block;
          position: relative;
          float: left;
          background: #FFF;
          color: #000;
          text-align: center;
          width: 160px;
          /*background-image: url('icons/select_arrow.png');
          background-repeat: no-repeat;
          background-position: right;*/
        }
        
        li ul {
            display: none;
        }

        ul li a {
          height: 45px;
          line-height: 45px;
          display: block;
          text-decoration: none;
          white-space: nowrap;
          color: #000;
          cursor: pointer;
        }

        ul li a:hover {
            background: rgba(74, 80, 100, 1);
        }
        
        li:hover > ul {
          display: block;
          position: absolute;
        }

        li:hover li {
            float: none;
        }

        li:hover a {
            background: #363c52;
            color: white;
        }

        li:hover li a:hover {
            background: rgba(74, 80, 100, 1);
        }

        .main-navigation li ul li {
            border-top: 0;
        }
        
        ul ul ul {
            left: 100%;
            top: 0;
        }
        
        ul:before,
        ul:after {
          content: " "; /* 1 */
          display: table; /* 2 */
        }

        ul:after {
            clear: both;
        }
        
        .test li {
            height: 32px;
            line-height: 32px;
            font-size: 12px
        }
    
        .test li a {
            height: 32px;
            line-height: 32px;
            font-size: 11px
        }
    </style>
</table-dropdown>
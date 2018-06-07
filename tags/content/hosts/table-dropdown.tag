<table-dropdown>
    <ul class="listDrop">
        <li>
          <a>
            {this.opts.top != "" ? this.opts.top : this.opts.default }
          </a>
          <ul class="test">
            <yield />
          </ul>
        </li>
    </ul>

    <style>
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
        }

        ul li a {
          display: block;
          text-decoration: none;
          white-space: nowrap;
          color: #000;
          cursor: pointer;
        }

        li ul {
            display: none;
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
      */

      /*
        .oneline {
            line-height: 45px;
        }
        
        .top_show {
            font-size: 16px;
        }
        
        .add_show {
            font-size: 11px;
        }
        
        li ul {
            display: none;
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
          content: " "; 
          display: table;
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
      */
    </style>
</table-dropdown>

<top-bar>
  <nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#hosts">
      <img src="icons/cisco.png">
      &nbsp;
      &nbsp;
      &nbsp;
      KUBAM
    </a>
    <span class="navbar-text mr-auto" id="currentpage">
        &nbsp;
        &nbsp;
        <router>
              <route path="network..">Network Groups</route>
              <route path="images..">Server Images</route>
              <route path="infrastructure">Infrastructure</route>
              <route path="infrastructure/*"><inner-tag /></route>
              <route path="hosts..">Hosts</route>
              <route path="settings..">Settings</route>
              <route path="tutorial..">Tutorial</route>
              <route path="feedback..">Feedback</route>
        </router>
    </span>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a href="https://ciscoucs.github.io/kubam">
          <img src="icons/tutorial.png">
        </a>
      </li>
      <li class="nav-item">
        <a href="https://github.com/CiscoUcs/KUBaM">
          <img src="icons/github.png">
        </a>
      </li>
    </ul>
  </nav>
</top-bar>

<inner-tag>
  <p class="topb"><a href="#infrastructure" onclick="route('infrastructure')">Infrastructure</a> | { name }</p>
  <script>
    this.on('route', name => this.name = name)
  </script>
</inner-tag>

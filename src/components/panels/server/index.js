import React from 'react'

// given an IP address,  automatically increase the IP address by 1.
var bumpIP = ( ipa, k ) => {
    ipa = ipa.split(".");
    var ipnum = 0;
    for ( var i = 0; i <= 3; ++i )
    {
        ipnum = ipnum * 0x100 + 1 * ipa[i];
    }
    ipnum += k;
    for ( i = 3; i >= 0; --i )
    {
        ipa[i] = ( ipnum & 0xFF ).toString(10);
        ipnum = Math.floor( ipnum / 256 );
    }
    return ipa.join(".");
}


var incrementHost = (suffix, nextI) => {
  var nextNum = parseInt(suffix, 10) + nextI; // get the next number
  var nu = nextNum.toString(); // convert number to a string
  while ( nu.length < suffix.length) nu = "0" + nu;
  return nu;
}
// when user enters in a hostname try to automatically fill the other
// hostnames if suffix ends with number. 
var hostOnblur = (e, i, max) => {
  var el = document.getElementById("hostname[" + i + "]");
  var re = /\d+$/;
  var found = el.value.match(re);
  if (found === null ){
    return;
  }
  // get the suffix.  Might be 1 or 001.  
  var startNum = found[0];
  //var lastString = el.value.replace(/(\d+$/, function(n){ return ++n});
  //console.log(el.value, max, lastString);
  for (var j = i+1, k = 1; j < max; j++, k++) {
    var nextEl = document.getElementById("hostname[" + j + "]");
    //if (nextEl.value === "") {
      nextEl.value = el.value.replace(startNum, incrementHost(startNum, k));
    //}
  }
}

var ipOnblur = (e, i, max) => {
  var el = document.getElementById("ip[" + i + "]");
  for (var j = i+1, k = 1; j < max; j++, k++) {
    var nextEl = document.getElementById("ip[" + j + "]");
    nextEl.value = bumpIP(el.value, k)
  }
}

var osOnChange = (e, i, max) => {
  var el = document.getElementById("os[" + i + "]");
  for (var j = i+1, k = 1; j < max; j++, k++) {
    var nextEl = document.getElementById("os[" + j + "]");
    nextEl.value = el.value;
  }
}


var ServerList = ({servers, clickFunc}) => (
  <div className="card-body">
     <div className="row">
      <div className="col">
        <h1 className="">UCS Server Settings</h1>
        <p className="small text-muted">Configure and select the UCS servers</p>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <hr/>
        <h4>UCS Servers</h4>
        <p className="small text-muted">Select the UCS servers that will be deployed.</p>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <div className="scrolling-list">
        <h4 className="text-muted">Blade Servers </h4>
        <ul className="list-group" > 
          { servers.filter( (server, i) => ( server.type === "blade")).map( (server, i) => 
                server.selected ? 
                <li className="list-group-item list-group-item-action active" key={i} onClick={(e)=> clickFunc(e, server, servers)}>
                  Chassis: {server.chassis_id} Slot: {server.slot}
                  <br/>
                  Service Profile: { server.association === "associated" ?  server.service_profile : "Unassociated" }
                  <br/>
                  {server.model}
                </li>
                :
                <li className="list-group-item list-group-item-action" key={i} onClick={(e)=> clickFunc(e, server, servers)}>
                  Chassis: {server.chassis_id} Slot: {server.slot}
                  <br/>
                  Service Profile: { server.association === "associated" ?  server.service_profile : "Unassociated" }
                  <br/>
                  {server.model}
                </li>
              )
          }
        </ul>
        <h4 className="text-muted">Rack Servers </h4>
        <ul className="list-group"> 
          { servers.filter( (server, i) => (server.type === "rack")).map( (server, i) => 
                server.selected ? 
                <li className="list-group-item list-group-item-action active" key={i} onClick={(e) => clickFunc(e, server, servers)}>
                  Rack Unit: {server.rack_id}
                  <br/>
                  Service Profile: { server.association === "associated" ?  server.service_profile : "Unassociated" }
                  <br/>
                  {server.model}
                </li>
                :
                <li className="list-group-item list-group-item-action" key={i} onClick={(e) => clickFunc(e, server, servers)}>
                  Rack Unit: {server.rack_id}
                  <br/>
                  Service Profile: { server.association === "associated" ?  server.service_profile : "Unassociated" }
                  <br/>
                  {server.model}
                </li>
              )
          }
        </ul>
        </div>
      </div>
      <div className="col">
        <h3>Selected Servers</h3>
        { servers.filter( (server, i) => (server.selected === true)).map( (server, i) => 
            server.type === "rack" ? 
            <div key={i}>Rack {server.rack_id}</div>
            :
            <div key={i}>Blade {server.chassis_id}/{server.slot}</div>
        
        )}
      </div>
      
    </div>
    <div className="row">
      <div className="col">
        <hr/>
        <h4>Host Settings</h4>
        <p className="small text-muted">Configure the host settings of the servers to be deployed.</p>
      </div>
    </div>
   <form className="form">
    { servers.filter( (server, i) => (server.selected === true)).map( (server, i) => 
    <div className="row" key={i}>
      <div className="col">
        <label htmlFor={ 'hostname[' + i + ']'} className="text-muted">hostname</label>
        <input type="text" className="form-control" 
                onBlur={(e) => hostOnblur(e, i, servers.filter((server,i) => (server.selected === true)).length) }
                id={"hostname[" + i +"]"} />
      </div>
      <div className="col">
        <label htmlFor="ip" className="text-muted">IP Address</label>
        <input type="text" className="form-control" 
                onBlur={(e) => ipOnblur(e, i, servers.filter((server,i) => (server.selected === true)).length) }
                id={"ip[" + i +"]"} />
      </div>
      <div className="col">
        <label htmlFor="os" className="text-muted">Operating System</label>
        <select className="custom-select form-control"
                onChange={(e) => osOnChange(e, i, servers.filter((server,i) => (server.selected === true)).length) }
                id={"os["+i+"]"}>
          <option value="centos7.3" defaultValue>CentOS 7.3</option>
          <option value="rhel7.3">RedHat 7.3</option>
          <option value="esxi6.0">ESXi 6.0</option>
          <option value="esxi6.5">ESXi 6.5</option>
        </select>
      </div>
    </div>
    )}
    </form>
    <div className="row">
      <div className="col text-right">
        <br/>
        <hr/>
        <button onClick={(e) => clickFunc(e, "")} className="btn btn-primary">Next</button>
      </div>
    </div>
  </div>
);

export default ServerList

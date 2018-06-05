# KUBAM GUI

RiotJS front end to the [KUBAM](https://github.com/CiscoUcs/KUBAM) API server. 

![](./images/dash.png)

## Purpose
The GUI aims to walk the user through the steps required to deploy an Operating system (and perhaps more) on top of UCS.  The steps are as follows: 

* Connect to UCS Domains
* Choose Network Settings
* Choose Servers from UCS for the server pool. Configure the host settings
* Choose the operating system settings: lay them out, templates, etc. 
* Deploy the system components. 

## Development

When updating the pages run:

```
riot tags tags.js
```
To set the js scripts correct. 

## Running

The easiest way to see the GUI is to run it as a docker container: 

```
docker run -d -p 8002:80 -e "KUBAM_API=172.28.225.135" kubam/web:v2
```

The ```KUBAM_API=``` environment variable should be set to the IP where the KUBAM API is running. 


## CI/CD

```
drone secret add -repository CiscoUcs/KUBAM-Frontend -image vallard/drone-spark -name SPARK_TOKEN -value YmI...
drone secret add -repository CiscoUcs/KUBAM-Frontend -image plugins/docker -name docker_username -value kubam
drone secret add -repository CiscoUcs/KUBAM-Frontend -image plugins/docker -name docker_password -value mysecret
drone secret add -repository CiscoUcs/KUBAM-Frontend -image appleboy/drone-ssh -name ssh_password -value secretpasswrd
```

# KUBAM GUI

React+Redux front end to the [KUBAM](https://github.com/CiscoUcs/KUBAM) API server. 

![](./images/dash.png)



## Run the app

```
npm start
```


## Code Structure

In the ```src``` directory there are the following:

* ```actions```: the ```index.js``` file holds all of the types of actions that can happen in the app. 
* ```components```
* ```containers```: Tie actions and components together.
* ```reducers```: Takes the actions and updates the state in the database.  

as well as the ```index.js``` which is the main starting point of the node application. 
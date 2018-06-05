#!/bin/bash

if [ -z $KUBAM_API ]
then 
  KUBAM_API=kubam
fi

echo "var KUBAM_IP = '$KUBAM_API'" >/usr/share/nginx/html/environment.js
nginx -g "daemon off;"

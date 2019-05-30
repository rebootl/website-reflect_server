#!/usr/bin/env bash

case $1 in
  start)
    docker run \
        -v ${PWD}/reflect.db:/appdata/reflect.db \
        -v ${PWD}/reflect_server:/app \
        -p 5010:5010 \
        --name myreflectserver-devel \
        myreflectserver /app/devel-server.py
  ;;
  stop)
    docker stop myreflectserver-devel
    docker rm myreflectserver-devel
  ;;
  restart)
    $0 stop && $0 start
  ;;
  *)
    echo "nothing..."
  ;;
esac

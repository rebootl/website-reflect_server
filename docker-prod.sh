#!/usr/bin/env bash

. config-prod-db.sh

case $1 in
  start)
		docker run \
				-v ${DB_PATH}:/appdata/reflect.db \
        -p 5005:8000 \
        --name myreflectserver-prod \
        myreflectserver gunicorn -b :8000 wsgi:app
  ;;
  stop)
    docker stop myreflectserver-prod
  ;;
  clean)
    docker rm myreflectserver-devel
  ;;
  restart)
    $0 stop && $0 clean && $0 start
  ;;
  *)
    echo "nothing..."
  ;;
esac

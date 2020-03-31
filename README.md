__Info: This server got replaced by a nodejs version:__ [reflectapp](https://github.com/rebootl/reflectapp) (client and server)

__This repository is kept for reference only.__

---

# reflect

"manage notes, links, images aso. w/ a modern looking webapplication"

## Server

"Restlike" api server for the reflect app.

## Tasks / Issues

See notes.md.

## Production Setup / Deployment

- this setup usually will have a proxy in front of the webapp,
  see: http://flask.pocoo.org/docs/1.0/deploying/wsgi-standalone/

- copy and adapt the config files
  - config-prod-db-example.sh
  - config-prod-example.py

- create empty database: `sqlite3 reflect.db < schema.sql`

(create schema: `sqlite3 reflect.db .schema > schema.sql`)

- creating a test db w/ some test content requires python-peewee
  to be installed... script: `./create_test_DB.py`

### Upgrade process ???

Should be something along of:

- git pull
- ./docker-build.sh
- ./docker-prod.sh restart

A docker-test.sh, based on the prod, could be included in between.

## Development

Technologies: flask, sqlite, peewee

- really glad I found peewee, didn't like sqlalchemy when I checked it out last time, that was some time ago tho

- flask-jwt-extended, +1 ,didn't like flask-jwt, forces me to create object, weird stuff...
created a PKGBUILD for it
-> evtl. upload to the AUR ==> DONE

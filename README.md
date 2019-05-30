# reflect

"manage notes, links, images aso. w/ a modern looking webapplication"

## server

"restlike" api server for the reflect app

## Tasks / Issues

see notes.md

## Setup / Deployment

- copy and adapt the config files
  - config-prod-db-example.sh
  - config-prod-example.py

- create empty database: `sqlite3 reflect.db < schema.sql`

(create schema: `sqlite3 reflect.db .schema > schema.sql`)

- creating a test db w/ some test content requires python-peewee
  to be installed... script: `./create_test_DB.py`

## Development

Technologies: flask, sqlite, peewee

- really glad I found peewee, didn't like sqlalchemy when I checked it out last time, that was some time ago tho

- flask-jwt-extended, +1 ,didn't like flask-jwt, forces me to create object, weird stuff...
created a PKGBUILD for it
-> evtl. upload to the AUR ==> DONE

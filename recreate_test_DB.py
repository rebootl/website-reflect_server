#!/usr/bin/python
#
# script to recreate test-db
#
import os
import sys

from reflect_server import Model

if os.path.isfile(Model.database.database):
    print("(re-)move old db first")
    sys.exit()

Model.create_tables()
Model.create_testdata()

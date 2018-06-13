#!/usr/bin/python
from reflect_server.reflect_server import app

app.run(debug=True, host="0.0.0.0", port="5010")

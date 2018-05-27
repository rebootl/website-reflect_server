#!/usr/bin/python
# standalone server

import os
from http.server import HTTPServer, CGIHTTPRequestHandler

serve=HTTPServer(('', 5009), CGIHTTPRequestHandler)
serve.serve_forever()

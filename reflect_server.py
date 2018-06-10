from flask import Flask, jsonify, request
from flask_cors import cross_origin

from Model import database

app = Flask(__name__)

@app.before_request
def before_request():
    database.connect()

@app.after_request
def after_request(response):
    database.close()
    return response

### routes

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/hello')
@cross_origin()
def api_hello():
    data = { 'text': "Hello flask API :D" }
    return jsonify(data)

@app.route('/api/get_content_data')
@cross_origin()
def api_get_content_data():
    data = { 'query_str': str(request.query_string) }
    return jsonify(data)

@app.route('/api/get_selection_data')
@cross_origin()
def api_get_selection_data():
    data = [
        { 'ref': "astro",
            'label': "Astro",
            'active': False,
            'subtags': [ { 'ref': "apod",
                           'label': "apod",
                           'active': False },
                         { 'ref': "planets",
                           'label': "planets",
                           'active': False },
                         { 'ref': "observation",
                           'label': "observation",
                           'active': False } ]
          },
          { 'ref': "chess",
            'label': "Chess",
            'active': False,
            'subtags': [ { 'ref': "openings",
                           'label': "openings",
                           'active': False },
                         { 'ref': "theory",
                           'label': "theory",
                           'active': False },
                         { 'ref': "tutorials",
                           'label': "tutorials",
                           'active': False } ]
          },
          { 'ref': "comp",
            'label': "Comp.",
            'active': False,
            'subtags': [ { 'ref': "javascript",
                           'label': "javascript",
                           'active': False },
                         { 'ref': "python",
                           'label': "python",
                           'active': False},
                         { 'ref': "ai",
                           'label': "ai",
                           'active': False } ]
            }
        ]

    return jsonify(data)

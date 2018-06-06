from flask import Flask, jsonify
from flask_cors import cross_origin

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/hello')
@cross_origin()
def api_hello():
    data = { 'text': "Hello flask API :D" }
    return jsonify(data)

@app.route('/api/get_content')
@cross_origin()
def api_get_content():
    pass

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

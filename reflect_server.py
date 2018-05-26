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

@app.route('/api/get_selection_data')
@cross_origin()
def api_get_selection_data():
    data = {
        'topics': [ "Astro", "Chess", "Comp.", "Gaming" ],
        'subtags': {
            "Astro": [ "apod", "planets", "observation" ],
            "Chess": [ "opening", "tutorials", "theory" ],
            "Comp": [ "javascript", "python", "ai" ],
            "Gaming": [ "WoW", "league", "game theory" ]
        }
    }
    return jsonify(data)

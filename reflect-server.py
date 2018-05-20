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

@app.route('/api/topics')
@cross_origin()
def api_topics():
    data = { 'topics': [ "Astro", "Chess", "Comp.", "Gaming" ] }
    return jsonify(data)

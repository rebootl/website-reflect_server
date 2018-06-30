from flask import Flask, jsonify, request
from flask_cors import cross_origin
#from playhouse.shortcuts import model_to_dict

from reflect_server.Model import database, Topic, Tag

app = Flask(__name__)

### users



### db setup

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
    data = {
        'query_str': str(request.query_string)
    }
    return jsonify(data)

@app.route('/api/get_selection_data')
@cross_origin()
def api_get_selection_data():

    # get selection from db
    sel_data = Topic.select().order_by(Topic.label).prefetch(Tag)

# model_to_dict function is provided but including 'active' on tags
# is not possible using this
# including it on database Model directly and using below function
# is actually __slower__ than using below nested for loops
# (tested on test dataset of 10 topics w/ 200 tags)
#    data = []
#    for topic in sel_data:
#        topic_dataset = model_to_dict(
#            topic,
#            exclude = [Topic.id, Tag.id],
#            backrefs = True,
#        )
#        data.append(topic_dataset)

    data = []
    for topic in sel_data:
        tags = []
        for tag in topic.tags:
            tag_dataset = {
                'ref': tag.ref,
                'label': tag.label,
                'active': False
            }
            tags.append(tag_dataset)
        topic_dataset = {
            'ref': topic.ref,
            'label': topic.label,
            'active': False,
            'subtags': tags
        }
        data.append(topic_dataset)

    return jsonify(data)

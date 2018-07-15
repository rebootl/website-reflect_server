from flask import Flask, jsonify, request
from flask_cors import cross_origin, CORS
#from playhouse.shortcuts import model_to_dict
from flask_jwt_extended import JWTManager, create_access_token, \
    jwt_required
from werkzeug.security import check_password_hash

from reflect_server.Model import database, Topic, Tag

app = Flask(__name__)
CORS(app)

### users

# -> make a user list here
app.config['USER'] = 'cem'
# (pw: 'tutut')
app.config['PW_SEC_HASH'] = 'pbkdf2:sha256:50000$yxnrweL8$db95937f8fc8dc4caebf8e6e2cf650b896105fd7d71fe0d42ac22bd7806297cb'

# Setup the Flask-JWT-Extended extension
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
jwt = JWTManager(app)

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
def api_hello():
    data = { 'text': "Hello flask API :D" }
    return jsonify(data)

### login

@app.route('/api/login', methods=['POST'])
def login_post():
    # mostly from jwt-ext. docs
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    if username != app.config['USER'] \
    or not check_password_hash(app.config['PW_SEC_HASH'], password):
        return jsonify({"msg": "Bad username or password"}), 401

    # Identity can be any data that is json serializable
    access_token = create_access_token(
        identity = username,
        expires_delta = False
    )
    return jsonify(access_token = access_token), 200

### protected routes

@app.route('/api/topics', methods = ['POST'])
@jwt_required
def api_topics_post():
    return "FOOOB"

### public routes

@app.route('/api/get_content_data')
def api_get_content_data():
    data = {
        'query_str': str(request.query_string)
    }
    return jsonify(data)

@app.route('/api/get_selection_data')
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

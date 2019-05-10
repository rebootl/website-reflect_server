from flask import Flask, jsonify, request
from flask_cors import cross_origin, CORS
#from playhouse.shortcuts import model_to_dict
from flask_jwt_extended import JWTManager, create_access_token, \
    jwt_required, get_jwt_identity, jwt_optional
from werkzeug.security import check_password_hash
from peewee import IntegrityError

import markdown
import json

from reflect_server.Model import database, Topic, Tag, Entry, \
    TopicToEntry, TagToEntry
from reflect_server.helpers import create_ref, get_active_topic_tags

app = Flask(__name__)
CORS(app)

### config

entry_types = [ 'note', 'link' ]

### users

# -> make a user list here
app.config['USER'] = 'cem'
# (pw: 'tutut')
# -> how did I create this hash ?
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

### helpers

def get_pub_entries(topic_ids, subtag_ids):
    # get corresponding entries from db
    if topic_ids == [] and subtag_ids == []:
        return Entry.get_public_batch()
    elif len(topic_ids) == 1 and subtag_ids == []:
        return Entry.get_public_batch_by_topic(topic_ids[0])
    elif len(topic_ids) == 1 and len(subtag_ids) > 0:
        return Entry.get_public_batch_by_tags(subtag_ids)
    else:
        return []

def get_all_entries(topic_ids, subtag_ids):
    print("PRIVATE & PUBLIC")
    # get corresponding entries from db
    if topic_ids == [] and subtag_ids == []:
        return Entry.get_comb_batch()
    elif len(topic_ids) == 1 and subtag_ids == []:
        return Entry.get_comb_batch_by_topic(topic_ids[0])
    elif len(topic_ids) == 1 and len(subtag_ids) > 0:
        return Entry.get_comb_batch_by_tags(subtag_ids)
    else:
        return []

### routes

#@app.route('/')
#def hello_world():
#    return 'Hello, World!'

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

@app.route('/api/entries', methods=['POST'])
@jwt_required
def api_entries_post():
    '''add a new entry'''
    det_type = request.json.get('det_type', None)
    text = request.json.get('text', None)
    author = request.json.get('author', None)
    sel_data = request.json.get('sel_data', None)
    if not text: return jsonify({"msg": "text cannot be empty..."}), 400
    if not author: return jsonify({"msg": "author cannot be empty..."}), 400
    if not sel_data: return jsonify({"msg": "Sel. Data missing..."}), 400
    if det_type == "note":
        ### -> create note entry here
        # -> process markdown into html (python-markdown)
        text_html = markdown.markdown(text)
        # -> make rich urls (python-micawber)
        #
        content = {
            "text": text,
            "text_html": text_html
        }
    elif det_type == "link":
        ### -> create link entry here
        # -> evtl make rich url
        return jsonify({"msg": "Not yet implemented :(..."}), 400
    else:
        # -> try to re-detect type here
        return jsonify({"msg": "Could not determine entry type :(..."}), 400
    # store to db
    #try:
    with database.atomic():
        e = Entry.create(
                type = det_type,
                author = author,
                content = json.dumps(content),
            )
    #except IntegrityError:
    #    return jsonify({"msg": "Integrity Error. :("}), 400
    ### -> process selection data
    topics, subtags = get_active_topic_tags(sel_data)
    # -> topics should be min. 1 !!
    for topic in topics:
        # -> try except
        with database.atomic():
            t = TopicToEntry.create(
                topic = topic['id'],
                entry = e.id
            )
    for subtag in subtags:
        # -> try except
        with database.atomic():
            t = TagToEntry.create(
                tag = subtag['id'],
                entry = e.id
            )
    return jsonify({ "id": e.id })

@app.route('/api/topics', methods = ['POST'])
@jwt_required
def api_topics_post():
    '''add a new topic'''
    # get data
    label = request.json.get('label', None)
    descr = request.json.get('description', "")
    if not label: return jsonify({"msg": "Missing label parameter"}), 400
    # store to db
    try:
        with database.atomic():
            t = Topic.create(
                label = label,
                description = descr
            )
    except IntegrityError:
        return jsonify({"msg": "Integrity Error. :("}), 400
    else:
        return jsonify({ "id": t.id })

@app.route('/api/topics/<id>', methods = ['PUT'])
@jwt_required
def api_topic_put(id):
    '''edit existing topic'''
    # get data
    label = request.json.get('label', None)
    descr = request.json.get('description', "")
    if not label: return jsonify({"msg": "Missing label parameter"}), 400
    # get instance from db
    topic = Topic.get(Topic.id == id)
    # update instance and save to db
    topic.label = label
    topic.description = descr
    try:
        with database.atomic():
            topic.save()
            return jsonify({ "id": id })
    except IntegrityError:
        return jsonify({"msg": "Integrity Error. :("}), 400

@app.route('/api/subtags', methods = ['POST'])
@jwt_required
def api_subtags_post():
    '''add a new subtag'''
    # get data
    label = request.json.get('label', None)
    descr = request.json.get('description', "")
    topic_id = request.json.get('topic_id', None)
    if not label: return jsonify({"msg": "Missing label parameter"}), 400
    if not topic_id: return jsonify({"msg": "Missing topic id parameter"}), 400
    # store to db
    try:
        with database.atomic():
            t = Tag.create(
                topic_id = topic_id,
                description = descr,
                label = label,
            )
    except IntegrityError:
        return jsonify({"msg": "Integrity Error. :("}), 400
    else:
        return jsonify({ "id": t.id })

@app.route('/api/subtags/<id>', methods = ['PUT'])
@jwt_required
def api_subtag_put(id):
    '''edit existing subtag'''
    # get data
    label = request.json.get('label', None)
    descr = request.json.get('description', "")
    if not label: return jsonify({"msg": "Missing label parameter"}), 400
    # get instance from db
    subtag = Tag.get(Tag.id == id)
    # update instance and save to db
    subtag.label = label
    subtag.description = descr
    try:
        with database.atomic():
            subtag.save()
    except IntegrityError:
        return jsonify({"msg": "Name already in use."}), 400
    else:
        return jsonify({ "id": id })

@app.route('/api/url_info/<url>')
@jwt_required
def api_url_info():
    pass

### partially protected routes

@app.route('/api/entries')
@jwt_optional
def api_entries():
    '''entries'''
    # get selection from request query
    # (debug prints)
    #print(request.args.getlist('topics[]'))
    #print(request.args.getlist('tags[]'))
    topic_ids = request.args.getlist('topic_ids[]')
    subtag_ids = request.args.getlist('subtag_ids[]')

    curr_user = get_jwt_identity()
    print(curr_user)
    # get public entries
    if curr_user == None:
        entries = get_pub_entries(topic_ids, subtag_ids)
    else:
        entries = get_all_entries(topic_ids, subtag_ids)

    # preprocess data
    DATE_FMT = "%c"
    entries_clean = []
    for entry in entries:
        # convert datetime obj.
        entry['timestamp'] = entry['timestamp'].strftime(DATE_FMT)
        entry['mod_timestamp'] = entry['mod_timestamp'].strftime(DATE_FMT)
        # (alt synt.)
        #entry.update({ 'timestamp': 1 })
        #entry.update({ 'mod_timestamp': 1 })
        # decode json
        entry['content'] = json.loads(entry['content'])
        entries_clean.append(entry)

    data = {
        'query_str': str(request.query_string),
        'entries': entries_clean
    }
    return jsonify(data)

### public routes

# -> make this route /api/entries (GET)
# ==> obsolete, replacing by below
@app.route('/api/get_content_data')
def api_get_content_data():
    data = {
        'query_str': str(request.query_string)
    }
    return jsonify(data)

@app.route('/api/topics')
def api_topics():
    '''topics (include subtags)'''

    # get data from db
    topics = Topic.select().order_by(Topic.label).prefetch(Tag)

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

    # preformat (add active keys)
    data = []
    for topic in topics:
        tags = []
        for tag in topic.tags:
            tag_dataset = {
                'id': tag.id,
                'label': tag.label,
                'active': False
            }
            tags.append(tag_dataset)
        topic_dataset = {
            'id': topic.id,
            'label': topic.label,
            'description': topic.description,
            'active': False,
            'subtags': tags
        }
        data.append(topic_dataset)

    return jsonify(data)

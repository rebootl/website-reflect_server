import datetime
import json

from peewee import (TextField, CharField, BooleanField, DateTimeField,
                    ForeignKeyField)
from playhouse.flask_utils import FlaskDB

db_wrapper = FlaskDB()

#class BaseModel(db_wrapper.Model):
#    class Meta:
#        database = database

class Topic(db_wrapper.Model):
    label = CharField()     # -> not null ?
    description = CharField(default = "")

class Tag(db_wrapper.Model):
    topic = ForeignKeyField(Topic, backref='tags')
    label = CharField()     # -> not null ? unique ?
    description = CharField(default = "")

class Entry(db_wrapper.Model):
    type = CharField()
    timestamp = DateTimeField(default = datetime.datetime.now)
    mod_timestamp = DateTimeField(default = datetime.datetime.now)
    content = TextField()
    author = CharField()
    pinned = BooleanField(default = False)
    private = BooleanField(default = False)

    ### public batches

    @classmethod
    def get_public_batch(cls, limit = 10, offset = None):
        return (Entry.select()
                     .where(Entry.private == False)
                     .order_by(Entry.pinned.desc(), Entry.timestamp.desc())
                     .limit(limit)
                     .offset(offset)
                     .dicts())

    @classmethod
    def get_public_batch_by_topic(cls, topic_id, limit = 10, offset = None):
        return (Entry.select()
                     .join(TopicToEntry)
                     .where(
                        (TopicToEntry.topic == topic_id) &
                        (Entry.private == False))
                     .order_by(Entry.pinned.desc(), Entry.timestamp.desc())
                     .limit(limit)
                     .offset(offset)
                     .dicts())

    @classmethod
    def get_public_batch_by_tags(cls, tag_ids, limit = 10, offset = None):
        return (Entry.select()
                     .join(TagToEntry)
                     .where(
                        (TagToEntry.tag << tag_ids) &
                        (Entry.private == False))
                     .order_by(Entry.pinned.desc(), Entry.mod_timestamp.desc())
                     .limit(limit)
                     .offset(offset)
                     .dicts())

    ### combined batches (public & private)

    @classmethod
    def get_comb_batch(cls, limit = 10, offset = None):
        return (Entry.select()
                     .order_by(Entry.pinned.desc(), Entry.timestamp.desc())
                     .limit(limit)
                     .offset(offset)
                     .dicts())

    @classmethod
    def get_comb_batch_by_topic(cls, topic_id, limit = 10, offset = None):
        return (Entry.select()
                     .join(TopicToEntry)
                     .where(TopicToEntry.topic == topic_id)
                     .order_by(Entry.pinned.desc(), Entry.timestamp.desc())
                     .limit(limit)
                     .offset(offset)
                     .dicts())

    @classmethod
    def get_comb_batch_by_tags(cls, tag_ids, limit = 10, offset = None):
        return (Entry.select()
                     .join(TagToEntry)
                     .where(TagToEntry.tag << tag_ids)
                     .order_by(Entry.pinned.desc(), Entry.timestamp.desc())
                     .limit(limit)
                     .offset(offset)
                     .distinct()
                     .dicts())

class TopicToEntry(db_wrapper.Model):
    topic = ForeignKeyField(Topic)
    entry = ForeignKeyField(Entry)

class TagToEntry(db_wrapper.Model):
    tag = ForeignKeyField(Tag)
    entry = ForeignKeyField(Entry)

### create db helper
def create_tables():
    with database:
        database.create_tables([
            Topic,
            Tag,
            Entry,
            TopicToEntry,
            TagToEntry
        ])

### from the docs
# Open a python shell in the directory alongside the example app
# and execute the following:
# >>> from app import *
# >>> create_tables()

# testdata json exports
testdata_map = [
    [ Entry, 'db-testdata/entry.json' ],
    [ Topic, 'db-testdata/topic.json' ],
    [ Tag, 'db-testdata/tag.json' ],
    [ TopicToEntry, 'db-testdata/topictoentry.json' ],
    [ TagToEntry, 'db-testdata/tagtoentry.json' ]
]

def import_data(table, file):
    with open(file, 'r') as f:
        data = json.load(f)
    for d in data:
        table.create(**d)

### create some test data, DEPRECATED, use import_data above
def create_testdata():
    top1 = Topic.create(ref="astro", label="Astro")
    top2 = Topic.create(ref="chess", label="Chess")
    top3 = Topic.create(ref="comp-", label="Comp.")
    tag1 = Tag.create(topic=top1, ref="apod", label="apod")
    tag2 = Tag.create(topic=top1, ref="planets", label="planets")
    tag3 = Tag.create(topic=top1, ref="observation", label="observation")
    tag4 = Tag.create(topic=top2, ref="openings", label="openings")
    tag5 = Tag.create(topic=top2, ref="theory", label="theory")
    tag6 = Tag.create(topic=top2, ref="tutorials", label="tutorials")
    tag7 = Tag.create(topic=top3, ref="javascript", label="javascript")
    tag8 = Tag.create(topic=top3, ref="python", label="python")
    tag9 = Tag.create(topic=top3, ref="ai", label="ai")
# create additional data for performance test
#    for n in range(10):
#        ref = "ref" + str(n)
#        print(ref)
#        t = Topic.create(ref=ref, label="labbi")
#        for m in range(200):
#            uref = "mref" + str(n) + "_" + str(m)
#            print(uref)
#            u = Tag.create(topic=t, ref=uref, label="labber")

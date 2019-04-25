import datetime

from peewee import Model, SqliteDatabase
from peewee import (TextField, CharField, BooleanField, DateTimeField,
                    ForeignKeyField)

database = SqliteDatabase('reflect.db')

class BaseModel(Model):
    class Meta:
        database = database

class Topic(BaseModel):
    label = CharField()     # -> not null ?
    description = CharField(default = "")

class Tag(BaseModel):
    topic = ForeignKeyField(Topic, backref='tags')
    label = CharField()     # -> not null ? unique ?
    description = CharField(default = "")

class Entry(BaseModel):
    type = CharField()
    timestamp = DateTimeField(default = datetime.datetime.now)
    mod_timestamp = DateTimeField(default = datetime.datetime.now)
    content = TextField()
    author = CharField()
    pinned = BooleanField(default = False)
    public = BooleanField(default = True)

    @classmethod
    def get_batch(cls, limit = 10, offset = None):
        return (Entry.select()
                     .order_by(Entry.pinned.desc(), Entry.timestamp.desc())
                     .limit(limit)
                     .offset(offset)
                     .dicts())

    @classmethod
    def get_public_batch(cls, limit = 10, offset = None):
        return (Entry.select()
                     .where(Entry.pinned.desc(), Entry.public == True)
                     .order_by(Entry.timestamp.desc())
                     .limit(limit)
                     .offset(offset)
                     .dicts())

    @classmethod
    def get_batch_by_topic(cls, topic_id, limit = 10, offset = None):
        return (Entry.select()
                     .join(TopicToEntry)
                     .where(TopicToEntry.topic == topic_id)
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
                        (Entry.public == True))
                     .order_by(Entry.pinned.desc(), Entry.timestamp.desc())
                     .limit(limit)
                     .offset(offset)
                     .dicts())

    @classmethod
    def get_batch_by_tags(cls, tag_ids, limit = 10, offset = None):
        return (Entry.select()
                     .join(TagToEntry)
                     .where(TagToEntry.tag << tag_ids)
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
                        (Entry.public == True))
                     .order_by(Entry.pinned.desc(), Entry.mod_timestamp.desc())
                     .limit(limit)
                     .offset(offset)
                     .dicts())

class TopicToEntry(BaseModel):
    topic = ForeignKeyField(Topic)
    entry = ForeignKeyField(Entry)

class TagToEntry(BaseModel):
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

### create some test data
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

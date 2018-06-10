from peewee import Model, SqliteDatabase
from peewee import CharField, BooleanField, DateTimeField, ForeignKeyField

database = SqliteDatabase('reflect.db')

class BaseModel(Model):
    class Meta:
        database = database

class Topic(BaseModel):
    ref = CharField(unique = True)
    label = CharField()
    description = CharField(default = "")
    active = BooleanField(default = False)

class Tag(BaseModel):
    topic = ForeignKeyField(Topic)
    ref = CharField(unique = True)
    label = CharField()
    active = BooleanField(default = False)





### create db helper
def create_tables():
    with database:
        database.create_tables([Topic, Tag])

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

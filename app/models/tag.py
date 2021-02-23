from .db import db
from .eventtag import event_tags


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)

    events = db.relationship(
      'Event', secondary=event_tags, back_populates='tags')

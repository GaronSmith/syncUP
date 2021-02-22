from .db import db
from .eventtag import event_tags
from .eventrsvp import event_rsvps


class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'),
                         nullable=False)
    details = db.Column(db.Text)
    location = db.Column(db.Text)
    image_url = db.Column(db.text)
    date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)

    owner = db.relationship('User')
    group = db.relationship('Group')
    tags = db.relationship(
      'Tag', secondary=event_tags, back_populates='events')
    users = db.relationship(
      'User', secondary=event_rsvps, back_populates='events')

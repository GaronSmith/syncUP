from .db import db
from datetime import datetime
from .eventtag import event_tags
from .eventrsvp import event_rsvps


class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'),
                         nullable=False)
    details = db.Column(db.Text)
    location = db.Column(db.Text)
    image_url = db.Column(db.Text)
    date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    capacity = db.Column(db.Integer, nullable=False)

    owner = db.relationship('User')
    group = db.relationship('Group')
    tags = db.relationship(
      'Tag', secondary=event_tags, back_populates='events')
    users = db.relationship(
      'User', secondary=event_rsvps, back_populates='events')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "owner_id": self.owner_id,
            "group_id": self.group_id,
            "details": self.details,
            "location": self.location,
            "image_url": self.image_url,
            "date": self.date,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "capacity": self.capacity,
            "group": self.group.to_dict_events(),
            "rsvps": len(self.users),
            "owner": self.owner.to_dict(),
            "attendees": [user.to_dict() for user in self.users],
            "group_name": self.group.name
        }

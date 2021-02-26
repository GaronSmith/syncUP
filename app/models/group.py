from .db import db
from .groupmember import group_members
from datetime import datetime


class Group(db.Model):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.Text)
    location = db.Column(db.Text)
    image_url = db.Column(db.Text)
    is_private = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    owner = db.relationship('User')
    users = db.relationship(
        'User', secondary=group_members, back_populates='groups')
    events = db.relationship('Event', back_populates='group')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "location": self.location,
            "is_private": self.is_private,
            "owner_name": self.owner.first_name,
            "image_url": self.image_url,
            "events": [event.to_dict_for_a_group() for event in self.events]
        }
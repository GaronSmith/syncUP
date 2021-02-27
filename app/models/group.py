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

    owner = db.relationship('User', back_populates='owned_groups')
    users = db.relationship(
      'User', secondary=group_members, back_populates='groups')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "location": self.location,
            "image_url": self.image_url,
            "is_private": self.is_private,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "owner": self.owner.to_dict(),
            "members": [member.to_dict() for member in self.users],
        }

    def to_dict_events(self):
        return {
          "id": self.id,
          "name": self.name,
          "description": self.description,
          "location": self.location,
          "image_url": self.image_url,
          "is_private": self.is_private,
        }

from .db import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .groupmember import group_members
from .eventrsvp import event_rsvps


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.Text)
    location = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    groups = db.relationship(
        'Group', secondary=group_members, back_populates='users')
    events = db.relationship(
        'Event', secondary=event_rsvps, back_populates='users')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "image_url": self.image_url,
            "location": self.location,
            "groups": [group.id for group in self.groups],
            "groups_names": [{"id": group.id, "name": group.name} for group in self.groups],
        }

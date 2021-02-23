from .db import db


# class EventRSVP(db.Model):
#     __tablename__ = 'event_rsvps'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
# nullable=False)
#     event_id = db.Column(db.Integer, db.ForeignKey('events.id'),
#                          nullable=False)

#     user = db.relationship('User')
#     event = db.relationship('Event')

event_rsvps = db.Table(
  'event_rsvps',
  db.Column(
    'event_id',
    db.Integer,
    db.ForeignKey('events.id'),
    primary_key=True),
  db.Column(
    'user_id',
    db.Integer,
    db.ForeignKey('users.id'),
    primary_key=True)
)

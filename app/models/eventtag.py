from .db import db


# class EventTag(db.Model):
#     __tablename__ = 'event_tags'

#     id = db.Column(db.Integer, primary_key=True)
#     tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), nullable=False)
#     event_id = db.Column(db.Integer, db.ForeignKey('events.id'),
#                          nullable=False)

#     event = db.relationship('Event')
#     group = db.relationship('Group')

event_tags = db.Table(
    'event_tags',
    db.Column(
        'tag_id',
        db.Integer,
        db.ForeignKey('tags.id'),
        primary_key=True),
    db.Column(
        'event_id',
        db.Integer,
        db.ForeignKey('events.id'),
        primary_key=True)
)

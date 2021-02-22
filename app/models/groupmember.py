from .db import db


# class GroupMember(db.Model):
#     __tablename__ = 'group_members'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(
# db.Integer, db.ForeignKey('users.id'), nullable=False)
#     group_id = db.Column(db.Integer, db.ForeignKey('groups.id'),
#                          nullable=False)

#     user = db.relationship('User')
#     group = db.relationship('Group')

group_members = db.Table(
    'group_members',
    db.Column(
        'user_id',
        db.Integer,
        db.ForeignKey('users.id'),
        primary_key=True),
    db.Column(
        'group_id',
        db.Integer,
        db.ForeignKey('groups.id'),
        primary_key=True)
)

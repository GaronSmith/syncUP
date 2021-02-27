from .db import db


class GroupQueue(db.Model):
    __tablename__ = 'group_queue'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'),
                         nullable=False)

    user = db.relationship('User')
    group = db.relationship('Group')

    def to_dict(self):
        return {
          "id": self.id,
          "user_id": self.user_id,
          "group_id": self.group_id,
        }

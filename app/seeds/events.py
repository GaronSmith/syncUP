from app.models import db, Event, Group, User
from datetime import date


def seed_events():
    group = Group.query.filter_by(name='Demo Group').first()
    owner = User.query.filter_by(email='demo@aa.io').first()
    demo = Event(
        name='Demonstation Event',
        details='An event worthy of a demonstration', owner_id=owner.id,
        group_id=group.id, date=date.today(), capacity=20)

    demo2 = Event(
        name='Another Demonstation Event',
        details='An event worthy of a demonstration, part 2', owner_id=owner.id,
        group_id=group.id, date=date.today(), capacity=25)

    db.session.add(demo, demo2)

    db.session.commit()


def undo_events():
    db.session.execute('TRUNCATE events CASCADE;')
    db.session.commit()

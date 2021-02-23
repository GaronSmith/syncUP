from app.models import db, Group, User


def seed_groups():
    owner = User.query.filter_by(email='demo@aa.io').first()
    demo = Group(
        name='Demo Group', description='A description fit for a demonstration',
        is_private=False, owner_id=owner.id)

    db.session.add(demo)

    db.session.commit()


def undo_groups():
    db.session.execute('TRUNCATE groups CASCADE;')
    db.session.commit()

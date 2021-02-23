from app.models import db, Tag


def seed_tags():

    demo = Tag(name='Demonstration')
    demo2 = Tag(name='Demo')

    db.session.add(demo)
    db.session.add(demo2)

    db.session.commit()


def undo_tags():
    db.session.execute('TRUNCATE tags CASCADE;')
    db.session.commit()

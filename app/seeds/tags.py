from faker import Faker

from app.models import db, Tag

fake = Faker()


def seed_tags():
    for i in range(50):
        tag = Tag(name=fake.word())
        db.session.add(tag)
    db.session.commit()


def undo_tags():
    db.session.execute('TRUNCATE tags CASCADE;')
    db.session.commit()

from app.models import db, Event, Group, User, Tag
from datetime import date, timedelta
from faker import Faker
import random

fake = Faker()
URL_EVENTS = ["https://syncup-project.s3.us-east-2.amazonaws.com/seeder-event-a.jfif",
              "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-event-b.jfif",
              "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-event-c.jfif",
              "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-event-d.jfif",
              "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-event-e.jfif",
              "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-event-f.jfif",
              "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-event-g.jfif",
              "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-event-h.jfif",
              "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-event-i.jfif"]

tags_list = [Tag(name=fake.word()) for x in range(20)]

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

    db.session.add(demo)
    db.session.add(demo2)

    for i in range(50):
        event = Event(
            name=fake.company(),
            owner_id=random.randrange(1, 50),
            details=fake.sentence(nb_words=6),
            image_url=URL_EVENTS[i % len(URL_EVENTS)],
            date=date.today() + timedelta(days=random.randrange(1, 100)),
            capacity=random.randrange(1, 50),
            group_id=random.randrange(1, 20),
            tags=[tags_list[i % len(tags_list)]]
        )
        db.session.add(event)
    db.session.commit()


def undo_events():
    db.session.execute('TRUNCATE events CASCADE;')
    db.session.commit()

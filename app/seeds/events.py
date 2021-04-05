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
    
    for i in range(50):
        event = Event(
            name=fake.company(),
            owner_id=random.randrange(1, 50),
            details=fake.sentence(nb_words=6),
            image_url=URL_EVENTS[i % len(URL_EVENTS)],
            date=date.today() + timedelta(days=random.randrange(150, 190)),
            capacity=random.randrange(1, 50),
            group_id=random.randrange(1, 20),
            tags=[tags_list[i % len(tags_list)]],
            location=', '.join([fake.city(), fake.state()])
        )
        db.session.add(event)
    db.session.commit()


def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()

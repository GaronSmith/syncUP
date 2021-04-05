from faker import Faker
import random
from app.models import db, Group, User

fake = Faker()

GROUP_URLS = ["https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-a.jfif", 
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-b.jfif",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-c.jfif",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-d.jfif",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-e.jfif",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-f.jfif",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-g.jfif",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-h.jfif",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-i.jfif",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-j.jfif" ]


def seed_groups():

    for i in range(20):
        group = Group(
            name=fake.company(),
            description=fake.text(),
            is_private=False,
            owner_id=random.randrange(1,50),
            image_url=GROUP_URLS[i % len(GROUP_URLS)],
            location=', '.join([fake.city(), fake.state()])
        )
        db.session.add(group)
    
    db.session.commit()


def undo_groups():
    db.session.execute('TRUNCATE groups RESTART IDENTITY CASCADE;')
    db.session.commit()

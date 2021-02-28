from faker import Faker
import random
from app.models import db, Group, User

fake = Faker()

GROUP_URLS = ["https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-a.jfi", 
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-b.jfi",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-c.jfi",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-d.jfi",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-e.jfi",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-f.jfi",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-g.jfi",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-h.jfi",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-i.jfi",
            "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-group-j.jfif" ]


def seed_groups():
    owner = User.query.filter_by(email='demo@aa.io').first()
    demo = Group(
        name='Demo Group', description='A description fit for a demonstration',
        is_private=False, owner_id=owner.id)

    db.session.add(demo)

    db.session.commit()

    for i in range(20):
        group = Group(
            name=fake.company(),
            description=fake.text(),
            is_private=(bool(i % 2)),
            owner_id=random.randrange(1,50),
            image_url=GROUP_URLS[i % len(GROUP_URLS)]
        )
        db.session.add(group)
    
    db.session.commit()


def undo_groups():
    db.session.execute('TRUNCATE groups CASCADE;')
    db.session.commit()

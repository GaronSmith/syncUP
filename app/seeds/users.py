from faker import Faker

# from werkzeug.security import generate_password_hash
from app.models import db, User

fake = Faker()
USERS_IMG = ["https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-a.jpg",
             "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-b.jpg",
             "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-c.jpg",
             "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-d.jpg",
             "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-e.jpg",
             "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-f.jpg",
             "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-g.jpg",
             "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-h.jpg",
             "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-i.jpg",
             "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-j.jpg",
             "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-k.jpg",
             "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-l.jpg",
             "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-m.jpg",
             "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-n.jpg",
             "https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-o.jpg"]


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        email='demo@aa.io', password='password', first_name='Demo',
        last_name='User',
        image_url="https://syncup-project.s3.us-east-2.amazonaws.com/seeder-user-a.jpg")

    db.session.add(demo)

    db.session.commit()
    for i in range(50):
        user = User(
            email=fake.email(),
            password=fake.name(),
            first_name=fake.name().split()[0],
            last_name=fake.name().split()[1],
            image_url=USERS_IMG[i % len(USERS_IMG)]
        )
        db.session.add(user)
        db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()

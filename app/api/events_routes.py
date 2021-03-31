from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Event, Tag, User
from sqlalchemy import asc, desc, and_
from sqlalchemy.orm import joinedload
from datetime import datetime, timedelta
import json
from app.forms import EventForm
from ..helpers import upload_file_to_s3

events_routes = Blueprint('events', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@events_routes.route('/', methods=['POST'])
def events():
    data = json.loads(request.data)
    val = data['val']
    start_date = data['start_date']
    end_date = data['end_date']
    if (not start_date and not end_date):
        events = Event.query.options(joinedload(Event.group)).\
                order_by(asc(Event.date)).filter(Event.name.like(f'%{val}%')).limit(20)
        return {"events": [event.to_dict() for event in events]}
    elif (start_date and not end_date):
        end_date = start_date + timedelta(weeks=500)
        events = Event.query.options(joinedload(Event.group)).order_by(
            asc(Event.date)).filter(Event.name.like(f'%{val}%')).\
            filter(and_(Event.date >= start_date, Event.date <= end_date)).limit(20)
        return {"events": [event.to_dict() for event in events]}
    else:
        events = Event.query.options(joinedload(Event.group)).order_by(
            asc(Event.date)).filter(Event.name.like(f'%{val}%')).\
                                    filter(and_(Event.date >= start_date,
                                                Event.date <= end_date)).limit(20)
        return {"events": [event.to_dict() for event in events]}


@events_routes.route('/tags', methods=['POST'])
def event_tags():
    data = json.loads(request.data)
    val = data['val']
    tags = Tag.query.order_by(asc(Tag.name)).filter(
        Tag.name.like(f'%{val}%')).limit(18)

    return {"tags": [tag.to_dict() for tag in tags]}


@events_routes.route('/<int:id>', methods=['GET'])
def event(id):
    event = Event.query.get(id)
    return event.to_dict()


@events_routes.route('/<int:id>', methods=['POST'])
def attend_event(id):
    data = json.loads(request.data)
    (userId, eventId) = (data['userId'], data['eventId'])
    user = User.query.get(userId)
    event = Event.query.get(eventId)
    print(event.users)
    if user not in event.users:
        event.users.append(user)
    else:
        event.users.remove(user)
    db.session.commit()
    return event.to_dict()


@events_routes.route('/new', methods=['POST'])
def new_event():
    user = User.query.get(current_user.id)

    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    url = ''
    if request.files:
        url = upload_file_to_s3(request.files['imageFile'])

    if form.validate_on_submit():

        event = Event(
            name=form.data['name'],
            owner_id=form.data['owner_id'],
            group_id=form.data['group_id'],
            details=form.data['details'],
            location=form.data['location'],
            image_url=url or 'https://syncup-project.s3.us-east-2.amazonaws.com/event-default.jpg',
            date=form.data['date'],
            capacity=form.data['capacity'],
        )

        db.session.add(event)
        event.users.append(user)
        db.session.commit()

        return event.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@events_routes.route('/<int:id>', methods=['DELETE'])
def delete_event(id):
    event = Event.query.get(id)
    db.session.delete(event)
    db.session.commit()
    return event.to_dict()

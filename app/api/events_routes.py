from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Event
from sqlalchemy import asc, desc, and_
from sqlalchemy.orm import joinedload
from datetime import datetime, timedelta
import json

events_routes = Blueprint('events', __name__)


@events_routes.route('/', methods=['POST'])
def events():
    data = json.loads(request.data)
    val = data['val']
    events = Event.query.order_by(asc(Event.date)).filter(
        Event.name.like(f'%{val}%'))
    return {"events": [event.to_dict() for event in events]}
    start_date = data['start_date']
    end_date = data['end_date']
    if (not start_date and not end_date):
        events = Event.query.options(joinedload(Event.group)).\
                order_by(asc(Event.date)).filter(Event.name.like(f'%{val}%'))
        return {"events": [event.to_dict() for event in events]}
    elif (start_date and not end_date):
        end_date = start_date + timedelta(weeks=500)
        events = Event.query.options(joinedload(Event.group)).order_by(
            asc(Event.date)).filter(Event.name.like(f'%{val}%')).\
                filter(and_(Event.date >= start_date, Event.date <= end_date))
        return {"events": [event.to_dict() for event in events]}
    else:
        events =Event.query.options(joinedload(Event.group)).order_by(
            asc(Event.date)).filter(Event.name.like(f'%{val}%')).\
                                    filter(and_(Event.date >= start_date,
                                                Event.date <= end_date))
        return {"events": [event.to_dict() for event in events]}


@events_routes.route('/<int:id>', methods=['GET'])
def event(id):
    event = Event.query.get(id)
    return event.to_dict()


# TO DO: POST /api/events/new
# TO DO: POST /api/events/:id

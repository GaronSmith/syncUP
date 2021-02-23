from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Event

event_routes = Blueprint('events', __name__)


@event_routes.route('/', method=['POST'])
def events(val):
    events = Event.query.filter(Event.name.like(f'%{val}%'))

    return {"events": [event.to_dict() for event in events]}

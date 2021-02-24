from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Event
import json

events_routes = Blueprint('events', __name__)


@events_routes.route('/', methods=['POST'])
def events():
    data = json.loads(request.data)
    val = data['val']
    events = Event.query.filter(Event.name.like(f'%{val}%'))
    return {"events": [event.to_dict() for event in events]}

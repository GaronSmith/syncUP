from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Group

group_routes = Blueprint('groups', __name__)


@group_routes.route('/')
@login_required
def groups():
    groups = Group.query.all()
    return {"groups": [groups.to_dict() for group in groups]}

@group_routes.route('/<int:id>')
@login_required
def group(id):
    group = Group.query.get(id)
    return group.to_dict()
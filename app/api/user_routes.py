from flask import Blueprint, request
from flask_login import login_required
from app.models import User, db
import json

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['put'])
@login_required
def update_user(id):
    user = User.query.get(id)
    data = json.loads(request.data)
    (column, val) = (data['column'], data['val'])
    setattr(user, column, val)
    db.session.commit()

    return user.to_dict()

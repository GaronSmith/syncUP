from flask import Blueprint, request
from flask_login import login_required, current_user
from ..helpers import s3, upload_file_to_s3, allowed_file
from app.models import User, Group, db
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


@user_routes.route('/groups', methods=['POST'])
@login_required
def add_new_group():
    user = User.query.get(current_user.id)
    data = json.loads(request.data)
    id = data['id']
    group = Group.query.get(id)
    print("*********", id)
    
    if group.is_private == False:
        user.groups.append(group)
        db.session.commit()

        return user.to_dict()
    
    return "Group is private"


@user_routes.route('/groups', methods=['DELETE'])
@login_required
def remove_group():
    user = User.query.get(current_user.id)
    data = json.loads(request.data)
    id = data['id']
    group = Group.query.get(id)
    print("*********", id)
    
    user.groups.remove(group)
    db.session.commit()

    return user.to_dict()


@user_routes.route('/image', methods=['post'])
@login_required
def get_image_url():
    url = upload_file_to_s3(request.files['imageFile'])

    return url


@user_routes.route('/<int:id>', methods=['put'])
@login_required
def update_user(id):
    user = User.query.get(id)
    data = json.loads(request.data)
    (column, val) = (data['column'], data['val'])
    setattr(user, column, val)
    db.session.commit()

    return user.to_dict()

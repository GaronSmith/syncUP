from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Group, db, User

from app.forms.group_form import GroupForm
from ..helpers import upload_file_to_s3
group_routes = Blueprint('groups', __name__)


@group_routes.route('/')
@login_required
def groups():
    groups = Group.query.all()
    return {"groups": [groups.to_dict() for group in groups]}

@group_routes.route('/<int:id>')
def group(id):
    group = Group.query.get(id)
    return group.to_dict()

@group_routes.route('/new', methods=['POST'])
@login_required
def new_group():
    user = User.query.get(current_user.id)

    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    url = ''
    if request.files:
        url = upload_file_to_s3(request.files['imageFile'])

    if form.validate_on_submit():

        group = Group(
            name=form.data['name'],
            owner_id=form.data['owner_id'],
            description=form.data['description'],
            location=form.data['location'],
            image_url=url or 'https://syncup-project.s3.us-east-2.amazonaws.com/group-default.jpg',
            is_private=form.data['is_private'],
        )

        db.session.add(group)
        group.users.append(user)
        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

from flask_wtf import FlaskForm
from wtforms import StringField, FileField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Group


def group_exists(form, field):
    print("Checking if group exits", field.data)
    name = field.data
    group = Group.query.filter(Group.name == name).first()
    if group:
        raise ValidationError("Group Name is already registered.")


class GroupForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), group_exists])
    owner_id = StringField('owner_id', validators=[DataRequired()])
    description = StringField('description')
    location = StringField('location')
    image_url = StringField('imageFile')
    is_private = BooleanField('is_private')

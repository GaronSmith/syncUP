from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Event


def event_exists(form, field):
    print("Checking if event exits", field.data)
    name = field.data
    event = Event.query.filter(Event.name == name).first()
    if event:
        raise ValidationError("User is already registered.")


class EventForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), event_exists])
    owner_id = StringField('owner_id', validators=[DataRequired()])
    group_id = StringField('group_id', validators=[DataRequired()])
    details = StringField('details')
    location = StringField('location')
    image_url = StringField('imageFile')
    date = StringField('date')
    capacity = StringField('capacity', validators=[DataRequired()])

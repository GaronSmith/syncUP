"""empty message

Revision ID: d1414ea081ac
Revises: 22579e8dba13
Create Date: 2021-02-28 12:34:39.974763

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd1414ea081ac'
down_revision = '22579e8dba13'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('events_name_key', 'events', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('events_name_key', 'events', ['name'])
    # ### end Alembic commands ###

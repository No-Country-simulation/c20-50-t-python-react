"""Initial migration

Revision ID: e1bec671c65c
Revises: 
Create Date: 2024-09-02 15:08:09.644942

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e1bec671c65c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('menu',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('producto', sa.String(length=255), nullable=False),
    sa.Column('precio', sa.Float(), nullable=False),
    sa.Column('descripcion', sa.String(length=255), nullable=True),
    sa.Column('categoria', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('agregados',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_menu', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=255), nullable=False),
    sa.Column('precio', sa.Float(), nullable=False),
    sa.Column('descripcion', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['id_menu'], ['menu.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('pedidos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_mesa', sa.Integer(), nullable=False),
    sa.Column('id_menu', sa.Integer(), nullable=False),
    sa.Column('id_agregado', sa.Integer(), nullable=True),
    sa.Column('cantidad', sa.Integer(), nullable=False),
    sa.Column('solicitado', sa.DateTime(), nullable=False),
    sa.Column('entregado', sa.Boolean(), nullable=True),
    sa.Column('hentrega', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['id_agregado'], ['agregados.id'], ),
    sa.ForeignKeyConstraint(['id_menu'], ['menu.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pedidos')
    op.drop_table('agregados')
    op.drop_table('menu')
    # ### end Alembic commands ###

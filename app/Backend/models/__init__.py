from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .menu import Menu
from .agregado import Agregado
from .pedido import Pedido

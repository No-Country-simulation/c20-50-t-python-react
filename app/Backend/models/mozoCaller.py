from . import db
from datetime import datetime

class Llamadas(db.Model):
    __tablename__ = 'mozoCaller'
    id = db.Column(db.Integer, primary_key=True)
    id_mesa = db.Column(db.Integer, nullable=False)
    solicitado = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    atendido = db.Column(db.Boolean, default=False)
    hentrega = db.Column(db.DateTime, nullable=True) 

    def __init__(self, id_mesa, solicitado=None, atendido=False, hentrega=None):
        self.id_mesa = id_mesa
        self.solicitado = solicitado or datetime.utcnow()
        self.atendido = atendido
        self.hentrega = hentrega

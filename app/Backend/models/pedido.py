from . import db

class Pedido(db.Model):
    __tablename__ = 'pedidos'
    id = db.Column(db.Integer, primary_key=True)
    id_mesa = db.Column(db.Integer, nullable=False)
    id_menu = db.Column(db.Integer, db.ForeignKey('menu.id'), nullable=False)
    id_agregado = db.Column(db.Integer, db.ForeignKey('agregados.id'))
    cantidad = db.Column(db.Integer, nullable=False)
    solicitado = db.Column(db.DateTime, nullable=False)
    entregado = db.Column(db.Boolean, default=False)
    hentrega = db.Column(db.DateTime)

    menu = db.relationship('Menu', backref=db.backref('pedidos', lazy=True))
    agregado = db.relationship('Agregado', backref=db.backref('pedidos', lazy=True))

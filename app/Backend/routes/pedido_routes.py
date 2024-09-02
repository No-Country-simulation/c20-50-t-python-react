from flask import Blueprint, request, jsonify
from models import db, Pedido
from datetime import datetime

pedido_bp = Blueprint('pedido', __name__)

@pedido_bp.route('/pedidos', methods=['POST'])
def create_pedido():
    data = request.get_json()

    id_menu = data.get('id_menu')
    id_mesa = data.get('id_mesa')
    agregados = data.get('agregados', [])
    cantidad = data.get('cantidad', 1)

    for id_agregado in agregados:
        nuevo_pedido = Pedido(
            id_mesa=id_mesa,
            id_menu=id_menu,
            id_agregado=id_agregado,
            cantidad=cantidad,
            solicitado=datetime.utcnow(),
            entregado=False,
            hentrega=None
        )
        db.session.add(nuevo_pedido)

    if not agregados:
        nuevo_pedido = Pedido(
            id_mesa=id_mesa,
            id_menu=id_menu,
            id_agregado=None,
            cantidad=cantidad,
            solicitado=datetime.utcnow(),
            entregado=False,
            hentrega=None
        )
        db.session.add(nuevo_pedido)

    db.session.commit()

    return jsonify({"message": "Pedido creado con éxito"}), 201

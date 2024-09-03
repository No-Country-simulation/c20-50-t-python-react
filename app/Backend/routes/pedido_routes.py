from flask import Blueprint, request, jsonify
from models import db, Pedido, Menu, Agregado
from schemas import MenuSchema, AgregadoSchema
from datetime import datetime
import pytz

pedido_bp = Blueprint('pedido', __name__)

menu_schema = MenuSchema()
agregado_schema = AgregadoSchema(many=True)

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

@pedido_bp.route('/pedidos', methods=['GET'])
def get_pedidos():
    pedidos = Pedido.query.all()
    result = []

    for pedido in pedidos:
        menu_item = Menu.query.get(pedido.id_menu)
        agregados = Agregado.query.filter_by(id_menu=pedido.id_menu).all()
        
        pedido_data = {
            "id": pedido.id,
            "id_mesa": pedido.id_mesa,
            "cantidad": pedido.cantidad,
            "solicitado": pedido.solicitado,
            "entregado": pedido.entregado,
            "hentrega": pedido.hentrega,
            "producto": menu_schema.dump(menu_item),
            "agregados": agregado_schema.dump(agregados)
        }
        
        result.append(pedido_data)
    
    return jsonify(result), 200

@pedido_bp.route('/pedidos/<int:id>', methods=['GET'])
def get_pedido(id):
    pedido = Pedido.query.get_or_404(id)
    
    menu_item = Menu.query.get(pedido.id_menu)
    agregados = Agregado.query.filter_by(id_menu=pedido.id_menu).all()

    pedido_data = {
        "id": pedido.id,
        "id_mesa": pedido.id_mesa,
        "cantidad": pedido.cantidad,
        "solicitado": pedido.solicitado,
        "entregado": pedido.entregado,
        "hentrega": pedido.hentrega,
        "producto": menu_schema.dump(menu_item),
        "agregados": agregado_schema.dump(agregados)
    }
    
    return jsonify(pedido_data), 200

#Metodo para marcar como entregado el pedido.
@pedido_bp.route('/pedidos/<int:id>/entregar', methods=['PUT'])
def marcar_entregado(id):
    pedido = Pedido.query.get_or_404(id)

    if pedido.entregado:
        return jsonify({"message": "El pedido ya ha sido entregado"}), 400

    
    timezone = pytz.timezone('America/Argentina/Buenos_Aires')  # Cambia esto según la zona horaria deseada
    local_time = datetime.now(timezone)

    pedido.entregado = True
    pedido.hentrega = local_time

    db.session.commit()

    return jsonify({"message": "Pedido marcado como entregado", "pedido": {
        "id": pedido.id,
        "entregado": pedido.entregado,
        "hentrega": pedido.hentrega
    }}), 200

#Este método sirve para corregir un pedido realizado. Por ahora tiene un limite de 3 minutos para ser funcional, luego de eso no permite cambios.
@pedido_bp.route('/pedidos/<int:id>/corregir', methods=['PUT'])
def corregir_pedido(id):
    pedido = Pedido.query.get_or_404(id)

    timezone = pytz.timezone('America/Argentina/Buenos_Aires')  # Cambia según la zona horaria deseada
    current_time = datetime.now(timezone)

    tiempo_solicitado = pedido.solicitado.astimezone(timezone)
    tiempo_limite = tiempo_solicitado + timedelta(minutes=3)

    if current_time > tiempo_limite:
        return jsonify({"message": "El tiempo para corregir el pedido ha expirado"}), 403

    if pedido.entregado:
        return jsonify({"message": "No se puede corregir un pedido que ya ha sido entregado"}), 400

    data = request.get_json()

    pedido.id_menu = data.get('id_menu', pedido.id_menu)
    pedido.id_agregado = data.get('id_agregado', pedido.id_agregado)
    pedido.cantidad = data.get('cantidad', pedido.cantidad)

    db.session.commit()

    return jsonify({"message": "Pedido corregido con éxito", "pedido": {
        "id": pedido.id,
        "id_menu": pedido.id_menu,
        "id_agregado": pedido.id_agregado,
        "cantidad": pedido.cantidad,
        "solicitado": pedido.solicitado,
        "entregado": pedido.entregado,
        "hentrega": pedido.hentrega
    }}), 200
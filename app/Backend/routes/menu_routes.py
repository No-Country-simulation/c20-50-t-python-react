from flask import Blueprint, request, jsonify
from ..models import db, Menu, Agregado
from ..schemas import MenuSchema, AgregadoSchema

menu_bp = Blueprint('menu', __name__)
menu_schema = MenuSchema()
menus_schema = MenuSchema(many=True)
agregado_schema = AgregadoSchema(many=True)

@menu_bp.route('/menu', methods=['GET'])
def get_menus():
    menus = Menu.query.all()
    result = []

    for menu in menus:
        agregados = Agregado.query.filter_by(id_menu=menu.id).all()
        menu_data = menu_schema.dump(menu)
        menu_data['agregados'] = agregado_schema.dump(agregados)
        result.append(menu_data)

    return jsonify(result), 200

@menu_bp.route('/menu/<int:id>', methods=['GET'])
def get_menu(id):
    menu = Menu.query.get_or_404(id)
    agregados = Agregado.query.filter_by(id_menu=menu.id).all()
    
    menu_data = menu_schema.dump(menu)
    menu_data['agregados'] = agregado_schema.dump(agregados)

    return jsonify(menu_data), 200

@menu_bp.route('/menu/<int:id>', methods=['PUT'])
def update_menu(id):
    menu = Menu.query.get_or_404(id)
    data = request.get_json()

    menu.producto = data.get('producto', menu.producto)
    menu.precio = data.get('precio', menu.precio)
    menu.descripcion = data.get('descripcion', menu.descripcion)
    menu.categoria = data.get('categoria', menu.categoria)

    Agregado.query.filter_by(id_menu=menu.id).delete()

    agregados_data = data.get('agregados', [])
    agregados = []
    for agregado_data in agregados_data:
        agregado = Agregado(
            id_menu=menu.id,
            nombre=agregado_data['nombre'],
            precio=agregado_data['precio'],
            descripcion=agregado_data.get('descripcion', '')
        )
        agregados.append(agregado)

    db.session.add(menu)
    db.session.add_all(agregados)
    db.session.commit()

    menu_data = menu_schema.dump(menu)
    menu_data['agregados'] = agregado_schema.dump(agregados)

    return jsonify(menu_data), 200

@menu_bp.route('/menu', methods=['POST'])
def create_menu():
    data = request.get_json()

    new_menu = Menu(
        producto=data['producto'],
        precio=data['precio'],
        descripcion=data.get('descripcion', ''),
        categoria=data.get('categoria', '')
    )

    db.session.add(new_menu)
    db.session.commit()  

    agregados_data = data.get('agregados', [])
    agregados = []
    for agregado_data in agregados_data:
        agregado = Agregado(
            id_menu=new_menu.id,
            nombre=agregado_data['nombre'],
            precio=agregado_data['precio'],
            descripcion=agregado_data.get('descripcion', '')
        )
        agregados.append(agregado)

    db.session.add_all(agregados)
    db.session.commit()

    menu_data = menu_schema.dump(new_menu)
    menu_data['agregados'] = agregado_schema.dump(agregados)

    return jsonify(menu_data), 201
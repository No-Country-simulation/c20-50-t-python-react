from flask import Blueprint, request, jsonify
from models import db, Menu, Agregado, Imagen
from schemas import MenuSchema, AgregadoSchema, ImagenSchema

menu_bp = Blueprint('menu', __name__)

menu_schema = MenuSchema()
menus_schema = MenuSchema(many=True)
agregado_schema = AgregadoSchema(many=True)
imagen_schema = ImagenSchema(many=True)

@menu_bp.route('/menu', methods=['GET'])
def get_menus():
    menus = Menu.query.all()
    result = menus_schema.dump(menus)
    return jsonify(result), 200

@menu_bp.route('/menu/<int:id>', methods=['GET'])
def get_menu(id):
    menu = Menu.query.get_or_404(id)
    menu_data = menu_schema.dump(menu)
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
    agregados = [Agregado(
        id_menu=menu.id,
        nombre=agregado_data['nombre'],
        precio=agregado_data['precio'],
        descripcion=agregado_data.get('descripcion', '')
    ) for agregado_data in agregados_data]
    
    db.session.add_all(agregados)
    
    Imagen.query.filter_by(id_menu=menu.id).delete()
    imagenes_data = data.get('imagenes', [])
    imagenes = [Imagen(
        id_menu=menu.id,
        url=imagen_data['url']
    ) for imagen_data in imagenes_data]
    
    db.session.add_all(imagenes)
    
    db.session.commit()

    menu_data = menu_schema.dump(menu)
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
    agregados = [Agregado(
        id_menu=new_menu.id,
        nombre=agregado_data['nombre'],
        precio=agregado_data['precio'],
        descripcion=agregado_data.get('descripcion', '')
    ) for agregado_data in agregados_data]
    
    db.session.add_all(agregados)

    imagenes_data = data.get('imagenes', [])
    imagenes = [Imagen(
        id_menu=new_menu.id,
        url=imagen_data['url']
    ) for imagen_data in imagenes_data]
    
    db.session.add_all(imagenes)

    db.session.commit()

    menu_data = menu_schema.dump(new_menu)
    return jsonify(menu_data), 201

@menu_bp.route('/menu/<int:id>', methods=['DELETE'])
def delete_menu(id):
    menu_item = Menu.query.get_or_404(id)

    Agregado.query.filter_by(id_menu=id).delete()
    Imagen.query.filter_by(id_menu=id).delete()

    db.session.delete(menu_item)
    db.session.commit()

    return jsonify({"message": "Producto, agregados e imágenes eliminados"}), 200

from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Usuario, Permiso
from schemas import UsuarioSchema
import jwt
import datetime
from functools import wraps

auth_bp = Blueprint('auth', __name__)
usuario_schema = UsuarioSchema()


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'message': 'Token es requerido'}), 403

        try:
            data = jwt.decode(token, "clave_secreta", algorithms=["HS256"])
            current_user = Usuario.query.filter_by(id=data['id']).first()
        except:
            return jsonify({'message': 'Token es inválido'}), 403

        return f(current_user, *args, **kwargs)

    return decorated


@auth_bp.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()

    hashed_password = generate_password_hash(data['password'], method='sha256')

    new_user = Usuario(
        nombre=data['nombre'],
        email=data['email'],
        password=hashed_password,
        id_permiso=data.get('id_permiso', 1)  
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Nuevo usuario registrado con éxito'}), 201


@auth_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = Usuario.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Credenciales inválidas'}), 401

    
    token = jwt.encode({
        'id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, "clave_secreta", algorithm="HS256")

    return jsonify({'token': token}), 200


@auth_bp.route('/auth/permiso', methods=['GET'])
@token_required
def verificar_permiso(current_user):
    permiso = Permiso.query.filter_by(id=current_user.id_permiso).first()

    if not permiso:
        return jsonify({'message': 'No se encontraron permisos para este usuario'}), 404

    return jsonify({
        'id_usuario': current_user.id,
        'permiso': permiso.nombre,
        'nivel': permiso.nivel
    }), 200

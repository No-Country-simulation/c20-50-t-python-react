from flask import Blueprint, request, jsonify
from models import db, Llamadas
from datetime import datetime
import pytz
from middleware.auth_middleware import login_required, check_permissions

mozoCaller_bp = Blueprint('mozoCaller', __name__)

URL_ENDPOINT = '/mozocall'

@mozoCaller_bp.route(URL_ENDPOINT, methods=['POST'])
def create_mozocall():
    data = request.get_json()

    if isinstance(data, dict):
        data = [data]

    for mozocall_data in data:
        id_mesa = mozocall_data.get('id_mesa')

        if not id_mesa:
            return jsonify({"message": f'Número de mesa inválido'}), 400
        else:
            nuevo_mozoCall = Llamadas(
                id_mesa=id_mesa,
                solicitado=datetime.utcnow(),
                atendido=False,
                hentrega=None
            )
            db.session.add(nuevo_mozoCall)

    db.session.commit()

    return jsonify({"message": "El mozo ha sido llamado"}), 201


@mozoCaller_bp.route(URL_ENDPOINT, methods=['GET'])
@login_required
@check_permissions(1)
def get_mozoCalls():
    mozoCalls = Llamadas.query.all()
    result = []

    for mozoCall in mozoCalls:
        mozocall_data = {
            "id": mozoCall.id,
            "mesa":mozoCall.id_mesa,
            "solicitado": mozoCall.solicitado,
            "atendido": mozoCall.atendido,
            "hentrega": mozoCall.hentrega,
        }
        result.append(mozocall_data)
    
    return jsonify(result), 200


@mozoCaller_bp.route(URL_ENDPOINT+'/<int:id>', methods=['GET'])
@login_required
@check_permissions(1)
def get_mozoCall(id):
    mozoCall = Llamadas.query.get_or_404(id)

    mozoCall_data = {
        "id": mozoCall.id,
        "mesa":mozoCall.id_mesa,
        "solicitado": mozoCall.solicitado,
        "atendido": mozoCall.atendido,
        "hentrega": mozoCall.hentrega,
    }
    
    return jsonify(mozoCall_data), 200


@mozoCaller_bp.route(URL_ENDPOINT + '/<int:id>/entregar', methods=['PUT'])
@login_required
@check_permissions(1)
def marcar_atendido(id):
    mozoCall = Llamadas.query.get_or_404(id)

    if mozoCall.atendido:
        return jsonify({"message": "El mozo ya atendió esta mesa"}), 400

    timezone = pytz.timezone('America/Argentina/Buenos_Aires')
    local_time = datetime.now(timezone)

    mozoCall.atendido = True
    mozoCall.hentrega = local_time

    db.session.commit()

    return jsonify({
        "message": "MozoCall marcado como atendido",
        "mozoCall": {
            "id": mozoCall.id,
            "mesa":mozoCall.id_mesa,
            "atendido": mozoCall.atendido,
            "hentrega": mozoCall.hentrega
        }
    }), 200


@mozoCaller_bp.route(URL_ENDPOINT + '/<int:id>', methods=['DELETE'])
@login_required
@check_permissions(1)
def delete_mozoCall(id):
    mozoCall = Llamadas.query.get_or_404(id) 

    db.session.delete(mozoCall)  
    db.session.commit()  

    return jsonify({"message": "MozoCall eliminado con éxito"}), 200 


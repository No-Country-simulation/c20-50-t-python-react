from marshmallow import Schema, fields

class PedidoSchema(Schema):
    id = fields.Int(dump_only=True)
    id_mesa = fields.Int(required=True)
    id_menu = fields.Int(required=True)
    id_agregado = fields.Int()
    cantidad = fields.Int(required=True)
    solicitado = fields.DateTime(required=True)
    entregado = fields.Bool()
    hentrega = fields.DateTime()

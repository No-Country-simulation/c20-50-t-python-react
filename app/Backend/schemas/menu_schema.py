from marshmallow import Schema, fields

class MenuSchema(Schema):
    id = fields.Int(dump_only=True)
    producto = fields.Str(required=True)
    precio = fields.Float(required=True)
    descripcion = fields.Str()
    categoria = fields.Str()

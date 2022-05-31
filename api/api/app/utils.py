from .models import db


def load_data_using_schema(Schema, data):
    schema = Schema()
    obj = schema.loads(data)

    db.session.add(obj)

    return schema, schema.jsonify(obj)

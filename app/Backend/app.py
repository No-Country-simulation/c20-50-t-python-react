from flask import Flask
from flask_migrate import Migrate
from models import db
from routes import init_app
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    db.init_app(app)
    migrate = Migrate(app, db)

    jwt = JWTManager(app)

    init_app(app)
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

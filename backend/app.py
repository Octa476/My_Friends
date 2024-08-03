# This file is used to start the backend aplication.

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Start de app object.
app = Flask(__name__)
CORS(app)

# Configure the app to use the database.
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"

# Configure that the database doens't store previous states of itself just
# the present state.
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Start teh data base for the app.
db = SQLAlchemy(app)

# Import the operations needed for 
# communicating with the client.
import routes
with app.app_context():
    db.create_all()

# The backend starts just if you run this script(app.py).
# The backend doesn't run if it is imported in other script.
if __name__ == "__main__":
    app.run(debug=True)
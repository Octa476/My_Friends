# This file is used as a table in the database.

from app import db

# This class is like a blueprint for the information which is stored
# in the data base.

# The class receive the database model.
class Friend(db.Model):
    # db.Integer is a type, primary_key means the id is unique.
    id = db.Column(db.Integer, primary_key=True)
    # db.String(100) is a string of 100 caracters, nullable=False
    # means every friend needs to have a name(is mandatory).
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    img_url = db.Column(db.String(200), nullable=True)

    # Used to organize the data using a dictionary.
    def to_json(self):
        return {
            "id":self.id,
            "name":self.name,
            "role":self.role,
            "description":self.description,
            "gender":self.gender,
            "imgUrl":self.img_url,
        }
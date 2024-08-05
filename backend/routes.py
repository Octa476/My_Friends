# This file is used to define the routes(the operations needed for 
# communicating with the client). 

from app import app, db
from flask import request, jsonify
from models import Friend

# Get the information from the database.
@app.route("/api/friends", methods=["GET"])
def get_friends():
    # Return all the data objects that are stored in the database
    # contained in a list.
    friends = Friend.query.all()
    # Create a list of dictionaries.
    result = [friend.to_json() for friend in friends]
    # Return the list as a list of json objects.
    return jsonify(result)

# Save new data in database.
@app.route("/api/friends", methods=["POST"])
def create_friend():
    try:
        # Get the data from the client(json format) received via POST method.
        data = request.json

        required_fields = ["name", "role", "description", "gender"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error":f'Missing required field: {field}'}), 400

        # Save every field of the data
        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")

        # Send img_url based on name and gender.
        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None

        # Create a new friend object.
        new_friend = Friend(name=name, role=role, description=description, gender=gender, img_url=img_url)
        # Add and commit the new friend to the database.
        db.session.add(new_friend)
        db.session.commit()
        return jsonify(new_friend.to_json()), 201
    except Exception as e:
        # If something went wrong.
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
    
# Delete data from the database.
@app.route("/api/friends/<int:id>",methods=["DELETE"])
def delete_friend(id):
    try:
        # Search for the data with the given id.
        friend = Friend.query.get(id)
        # Return error message if the data doesn't exist.
        if friend is None:
            return jsonify({"error":"Friend not found"}), 404
        
        # Delete the data from the database and commit the changes. 
        db.session.delete(friend)
        db.session.commit()
        # Return message.
        return jsonify({"msg":"Friend deleted"}), 200
    except Exception as e:
        # If something unexpected happened keep the current database state
        # and return an error message.
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
    
# Update a data field.
@app.route("/api/friends/<int:id>",methods=["PATCH"])
def update_friend(id):
    try:
        # Search for the data with the given id.
        friend = Friend.query.get(id)
        # Return error message if the data doesn't exist.
        if friend is None:
            return jsonify({"error":"Friend not found"}), 404
        
        # Get the data from the client(json format) received via POST method.
        data = request.json

        # Change the fields of the data with the given id.
        friend.name = data.get("name", friend.name)
        friend.role = data.get("role", friend.role)
        friend.description = data.get("description", friend.description)
        friend.gender = data.get("gender", friend.gender)

        # Save the changes of the database.
        db.session.commit()
        # Return the updated data.
        return jsonify(friend.to_json()), 200
    except Exception as e:
        # If something unexpected happened keep the current database state
        # and return an error message.
        db.session.rollback()
        return jsonify({"error":str(e)}), 500

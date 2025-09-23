from models.user import User, UserRole
from database import db

collection = db['users']

def postUser(user: User):
    try:
        result = collection.insert_one(user.model_dump())
        created = collection.find_one({'_id': result.inserted_id})

        if created:
            created['_id'] = str(created['_id'])
            return {
                "status": "success",
                "data": created
            }
            
        return {
            "status": "error",
            "data": None
        }

    except:
        return {
            "status": "error",
            "data": None
        }

def getUsers():
    try:
        users = []
        cursor = collection.find({})
        for doc in cursor:
            doc["_id"] = str(doc["_id"])
            users.append(doc)

        return {
            "status": "success",
            "data": users
        }

    except:
        return {
            "status": "error",
            "data": None
        }
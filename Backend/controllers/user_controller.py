from models.user import User, UserRole
from database import db
from bson import ObjectId
from utils import ResponseMessage

collection = db['users']

def registerUser(user: User):
    try:
        exist = collection.find_one({'email': user.email})
        if exist:
            return ResponseMessage.message404
        
        result = collection.insert_one(user.model_dump())
        created = collection.find_one({'_id': result.inserted_id})

        if created:
            created['_id'] = str(created['_id'])
            return {**ResponseMessage.message200, "data": created}
            
        return ResponseMessage.message400

    except:
        return ResponseMessage.message500

def getUsers(role: UserRole):
    try:
        users = []
        cursor = collection.find({'role': role})
        for doc in cursor:
            doc['_id'] = str(doc['_id'])
            users.append(doc)

        return {
            **ResponseMessage.message200,
            "data": users
        }

    except:
        return ResponseMessage.message500

def getUser(userId: str):
    try:
        if not ObjectId.is_valid(userId):
            return ResponseMessage.message400
        
        user = collection.find_one({'_id': ObjectId(userId)})
        if user:
            user['_id'] = str(user['_id'])
            return {
                **ResponseMessage.message200,
                "data": user
            }
        
        return ResponseMessage.message404
    
    except:
        return ResponseMessage.message500

def updateUser(userId: str, user: User):
    try:
        if not ObjectId.is_valid(userId):
            return ResponseMessage.message400
        
        exist = collection.find_one({'email': user.email})
        if exist:
            return ResponseMessage.message409
        
        user = collection.find_one({'_id': ObjectId(userId)})
        if user:
            updated = collection.update_one({'_id': ObjectId(userId)}, {'$set': user.model_dump()})
            if updated.modified_count > 0:
                return ResponseMessage.message200
        else:
            ResponseMessage.message404
        
    except:
        return ResponseMessage.message500

def deleteUser(userId: str):
    try:
        if not ObjectId.is_valid(userId):
            return ResponseMessage.message400
        
        user = collection.find_one({'_id': ObjectId(userId)})
        if user:
            deleted = collection.delete_one({'_id': ObjectId(userId)})
            if deleted.deleted_count > 0:
                return ResponseMessage.message200
        else:
            return ResponseMessage.message404
        
    except:
        return ResponseMessage.message500

from models.user import User, UserRole, UserStatus
from database import db
from bson import ObjectId
from utils import ResponseMessage
from datetime import datetime

collection = db['users']

def registerUser(user: User):
    try:
        exists = collection.find_one({'email': user.email})
        if exists:
            return ResponseMessage.message409
        
        user.register_date = datetime.now()
        
        result = collection.insert_one(user.model_dump())

        if result.inserted_id:
            return ResponseMessage.message200
            
        return ResponseMessage.message400

    except:
        return ResponseMessage.message500

def getUsers(role: UserRole, status: UserStatus):
    try:
        query = {}

        if role:
            query["role"] = role
        if status:
            query["status"] = status

        cursor = collection.find(query)

        users = []
        for doc in cursor:
            doc["_id"] = str(doc["_id"])
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

def updateUser(userId: str, user):
    try:
        if not ObjectId.is_valid(userId):
            return ResponseMessage.message400

        _user = collection.find_one({'_id': ObjectId(userId)})
        if not _user:
            return ResponseMessage.message404

        payload = user.model_dump(exclude_unset=True)

        # Evita colisión de email
        if "email" in payload:
            exists = collection.find_one({'email': payload["email"]})
            if exists and str(exists['_id']) != userId:
                return ResponseMessage.message409

        updated = collection.update_one(
            {'_id': ObjectId(userId)},
            {'$set': payload}
        )

        if updated.modified_count > 0:
            return ResponseMessage.message200

        return ResponseMessage.message400

    except Exception as e:
        print("ERROR UPDATE USER:", e)
        return ResponseMessage.message500

def deleteUser(userId: str):
    try:
        if not ObjectId.is_valid(userId):
            return ResponseMessage.message400
        
        user = collection.find_one({'_id': ObjectId(userId)})
        if not user:
            return ResponseMessage.message404
        
        services = db['services'].find_one({'provider_id': userId})
        if services:
            return ResponseMessage.message401
        
        contract = db['contracts'].find_one({'user_id': userId})
        if contract:
            return ResponseMessage.message401
        
        deleted = collection.delete_one({'_id': ObjectId(userId)})
        if deleted.deleted_count > 0:
            return ResponseMessage.message200
        
        return ResponseMessage.message404
        
    except:
        return ResponseMessage.message500

def updateStatus(userId: str, status: UserStatus):
    try:
        if not ObjectId.is_valid(userId):
            return ResponseMessage.message400
        
        user = db['users'].find_one({'_id': ObjectId(userId)})
        if user:
            updated = db['users'].update_many({'_id': ObjectId(userId)}, {'$set': {'status': status}})
            if updated.modified_count > 0:
                return ResponseMessage.message200
        
        return ResponseMessage.message400
        
    except:
        return ResponseMessage.message500

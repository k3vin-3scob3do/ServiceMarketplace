from models.auth import LoginRequest
from database import db
from bson import ObjectId
from utils import ResponseMessage
from jose import jwt
from fastapi import HTTPException

collection = db['users']

SECRET_KEY = 'SECRET_KEY_SERVICE_MARKETPLACE'

def login(user: LoginRequest):
    try:
        user = collection.find_one({'email': user.email, 'password': user.password})
        
        if not user:
            raise HTTPException(
                status_code=404,
                detail="Correo o contraseña incorrectos"
            )

        user_id = str(user['_id'])
        user['_id'] = user_id
        
        token = jwt.encode({'user_id': user_id}, SECRET_KEY, algorithm="HS256")
        
        return {
            **ResponseMessage.message200,
            "token": token,
            "data": user
        }
        
    except HTTPException:
        raise
    except:
        raise HTTPException(status_code=500, detail="Error en el servidor")
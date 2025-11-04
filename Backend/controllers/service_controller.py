from models.service import Service, ServiceCategory
from database import db
from bson import ObjectId
from utils import ResponseMessage

def registerService(service: Service):
    try:
        if not ObjectId.is_valid(service.provider_id):
            return ResponseMessage.message400
        
        exists = db['services'].find_one({'name': service.name})
        if exists:
            return ResponseMessage.message409

        provider = db['users'].find_one({'_id': ObjectId(service.provider_id)})
        if not provider:
            return ResponseMessage.message404

        _service = service.model_dump()
        provider_info = {
            'provider_name' : provider.get('name') + ' ' + provider.get('surnames'),
            'provider_phone': provider.get('phone'),
            'provider_email': provider.get('email')
        }

        all_service = {**_service, **provider_info}

        result = db['services'].insert_one(all_service)
        if result.inserted_id:
            return ResponseMessage.message200

        return ResponseMessage.message400

    except:
        return ResponseMessage.message500


def getServices(category: ServiceCategory):
    try:
        services = []
        cursor = db['services'].find({'category': category})
        for doc in cursor:
            doc['_id'] = str(doc['_id'])
            services.append(doc)

        return {
            **ResponseMessage.message200,
            "data": services
        }

    except:
        return ResponseMessage.message500
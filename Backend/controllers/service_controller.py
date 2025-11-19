from models.service import Service, ServiceCategory, ServiceStatus
from database import db
from bson import ObjectId
from utils import ResponseMessage

def registerService(service: Service):
    try:
        exists = db['services'].find_one({'name': service.name})
        if exists:
            return ResponseMessage.message409

        provider = db['users'].find_one({'_id': ObjectId(service.provider_id)})
        if not provider:
            return ResponseMessage.message404

        result = db['services'].insert_one(service.model_dump())
        if result.inserted_id:
            return ResponseMessage.message200

        return ResponseMessage.message400

    except:
        return ResponseMessage.message500


def getServices(category: ServiceCategory, status: ServiceStatus):
    try:
        services = []
        request = {
            'category': category,
            'status': status
        }
        
        if category == ServiceCategory.ALL:   
            cursor = db['services'].find({})
        else:
            cursor = db['services'].find(request)
            
        for doc in cursor:
            provider = db['users'].find_one({'_id': ObjectId(doc['provider_id'])})
            doc['_id'] = str(doc['_id'])
            doc['provider_name'] = provider.get('name')
            services.append(doc)

        return {
            **ResponseMessage.message200,
            "data": services
        }
                
    except:
        return ResponseMessage.message500

def getService(serviceId: str):
    try:
        if not ObjectId.is_valid(serviceId):
            return ResponseMessage.message400
        
        service = db['services'].find_one({'_id': ObjectId(serviceId)})
        if service:
            provider = db['users'].find_one({'_id': ObjectId(service.get('provider_id'))})
            service['_id'] = str(service['_id'])
            service['provider_name'] = provider.get('name')
            return {
                **ResponseMessage.message200,
                "data": service
            }
        
        return ResponseMessage.message404
    
    except:
        return ResponseMessage.message500

def updateService(serviceId: str, service: Service):
    try:
        if not ObjectId.is_valid(serviceId):
            return ResponseMessage.message400
        
        _service = db['services'].find_one({'_id': ObjectId(serviceId)})
        if not _service:
            return ResponseMessage.message404
        
        provider_id = _service.get('provider_id')
        contract = db['contracts'].find_one({'provider_id': provider_id})
        if not contract:
            updated = db['services'].update_one({'_id': ObjectId(serviceId)}, {'$set': service.model_dump()})
            if updated.modified_count > 0:
                return ResponseMessage.message200
        
        return ResponseMessage.message401 
        
    except:
        return ResponseMessage.message500

def deleteService(serviceId):
    try:
        if not ObjectId.is_valid(serviceId):
            return ResponseMessage.message400
        
        service = db['services'].find_one({'_id': ObjectId(serviceId)})
        if not service:
            return ResponseMessage.message404
        
        provider_id = service.get('provider_id')
        contract = db['contracts'].find_one({'provider_id': provider_id})
        if not contract:
            deleted = db['services'].delete_one({'_id': ObjectId(serviceId)})
            if deleted.deleted_count > 0:
                return ResponseMessage.message200
        
        return ResponseMessage.message401
    
    except:
        return ResponseMessage.message500

def updateStatus(serviceId: str, status: ServiceStatus):
    try:
        if not ObjectId.is_valid(serviceId):
            return ResponseMessage.message400 
        
        service = db['services'].find_one({'_id': ObjectId(serviceId)})
        if service:
            updated = db['services'].update_one({'_id': ObjectId(serviceId)}, {'$set': {'status': status}})
            if updated.modified_count > 0:
                return ResponseMessage.message200
        
        return ResponseMessage.message400
        
    except:
        return ResponseMessage.message500
            
    
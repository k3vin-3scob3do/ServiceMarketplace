from datetime import datetime
from models.contract import Contract, ContractStatus
from database import db
from bson import ObjectId
from utils import ResponseMessage

def requestContract(contract: Contract):
    try:
        c = contract.model_dump()
        c['request_date'] = datetime.now()
        result = db['contracts'].insert_one(c)
        if result.inserted_id:
            return ResponseMessage.message200
        
        return ResponseMessage.message400
    
    except:
        return ResponseMessage.message500

def getContracts(providerId: str, serviceId: str, clientId: str, status: str):
    try:
        filters = {}
        if providerId is not None and ObjectId.is_valid(providerId):
            filters['provider_id'] = providerId
        if serviceId is not None and ObjectId.is_valid(serviceId):
            filters['service_id'] = serviceId
        if clientId is not None and ObjectId.is_valid(clientId):
            filters['client_id'] = clientId
        if status is not None:
            filters['status'] = status

        contracts = []
        
        cursor = db['contracts'].find(filters)
        for doc in cursor:
            provider = db['users'].find_one({'_id': ObjectId(doc['provider_id'])})
            client = db['users'].find_one({'_id': ObjectId(doc['client_id'])})
            service = db['services'].find_one({'_id': ObjectId(doc['service_id'])})
            doc['_id'] = str(doc['_id'])
            doc['provider_name'] = provider.get('name')
            doc['service_name'] = service.get('name')
            doc['client_name'] = client.get('name')
            contracts.append(doc)
        
        return {
            **ResponseMessage.message200,
            'data': contracts
        }
        
    except:
        return ResponseMessage.message500
    
def getContract(contractId: str):
    try:
        if not ObjectId.is_valid(contractId):
            return ResponseMessage.message400
        
        contract = db['contracts'].find_one({'_id': ObjectId(contractId)})
        if contract:
            provider = db['users'].find_one({'_id': ObjectId(contract['provider_id'])})
            client = db['users'].find_one({'_id': ObjectId(contract['client_id'])})
            service = db['services'].find_one({'_id': ObjectId(contract['service_id'])})
            contract['_id'] = str(contract['_id'])
            contract['provider_name'] = provider.get('name')
            contract['service_name'] = service.get('name')
            contract['client_name'] = client.get('name')
            
            return {
                **ResponseMessage.message200,
                'data': contract
            }
        
        return ResponseMessage.message400
    
    except:
        return ResponseMessage.message500

def deleteContract(contractId: str):
    try:
        if not ObjectId.is_valid(contractId):
            return ResponseMessage.message400
        
        contract = db['contracts'].find_one({'_id': ObjectId(contractId)})
        if contract:
            status = contract.get('status')
            if status != ContractStatus.IN_PROGRESS:
                deleted = db['contracts'].delete_one({'_id', ObjectId(contractId)})
                if deleted.deleted_count > 1:
                    return ResponseMessage.message200
        
        return ResponseMessage.message400
         
    except:
        return ResponseMessage.message500

def updateStatus(contractId: str, status: ContractStatus):
    try:
        if not ObjectId.is_valid(contractId):
            return ResponseMessage.message400
        
        contract = db['contracts'].find_one({'_id': ObjectId(contractId)})
        if contract:
            updated = db['contracts'].update_one({'_id': ObjectId(contractId)}, {'$set': {'status': status}})
            if updated.modified_count > 0:
                return ResponseMessage.message200
        
        return ResponseMessage.message400
        
    except:
        return ResponseMessage.message500
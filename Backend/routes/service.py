from fastapi import APIRouter, HTTPException
from models.service import Service, ServiceCategory, ServiceStatus
from controllers import service_controller
from pydantic import BaseModel

router = APIRouter(prefix = "/service", tags = ["Service"])

class StatusUpdate(BaseModel):
    status: ServiceStatus

@router.post("/register")
def registerService(service: Service):
    return service_controller.registerService(service)

@router.get("/")
def getServices(category: ServiceCategory = None, status: ServiceStatus = None, providerId: str = ""):
    return service_controller.getServices(category, status, providerId)

@router.get("/{serviceId}")
def getService(serviceId: str):
    return service_controller.getService(serviceId)

@router.delete("/delete/{serviceId}")
def deleteService(serviceId: str):
    return service_controller.deleteService(serviceId)

@router.post("/status/{serviceId}")
def updateStatus(serviceId: str, data: StatusUpdate):
    return service_controller.updateStatus(serviceId, data.status)

@router.put("/update/{serviceId}")
def updateService(serviceId: str, service: Service):
    return service_controller.updateService(serviceId, service)

# @router.get("/details")
# def getDetails():
#     return service_controller.getDetails()
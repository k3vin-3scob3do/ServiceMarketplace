from fastapi import APIRouter, HTTPException
from models.service import Service, ServiceCategory, ServiceStatus
from controllers import service_controller

router = APIRouter(prefix = "/service", tags = ["Service"])

@router.post("/register")
def registerService(service: Service):
    return service_controller.registerService(service)

@router.get("/")
def getServices(category: ServiceCategory, status: ServiceStatus):
    return service_controller.getServices(category)

@router.get("/{serviceId}")
def getService(serviceId: str):
    return service_controller.getService(serviceId)

@router.put("/update/{serviceId}")
def updateService(serviceId, service: Service):
    return service_controller.updateService(serviceId, service)

@router.delete("/delete/{serviceId}")
def deleteService(serviceId: str):
    return service_controller.deleteService(serviceId)

@router.post("/status/{serviceId}")
def updateStatus(serviceId: str, status: ServiceStatus):
    return service_controller.updateStatus(serviceId, status)
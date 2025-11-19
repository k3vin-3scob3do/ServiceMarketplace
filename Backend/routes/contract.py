from fastapi import APIRouter, HTTPException
from models.contract import Contract, ContractStatus
from controllers import contract_controller

router = APIRouter(prefix = "/contract", tags = ["Contract"])

@router.post("/request")
def requestContract(contract: Contract):
    return contract_controller.requestContract(contract)

@router.get("/")
def getContracts(providerId: str, serviceId: str):
    return contract_controller.getContracts(providerId, serviceId)

@router.get("/{contractId}")
def getContract(contractId: str):
    return contract_controller.getContract(contractId)

@router.delete("/delete/{contractId}")
def deleteContract(contractId: str):
    return contract_controller.deleteContract(contractId)

@router.post("/status/{contractId}")
def updateStatus(contractId: str, status: ContractStatus):
    return contract_controller.updateStatus(contractId, status)
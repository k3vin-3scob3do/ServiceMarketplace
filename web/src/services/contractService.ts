import { ContractModel, ContractStatus } from "@/app/models/contract";
import { ApiResponse } from "@/app/models/response";
import axios from "axios";

const API = axios.create({
  baseURL: "https://servicemarketplace-tfrl.onrender.com/contract", // URL del backend
});

export const requestContract = async (contract: ContractModel): Promise<ApiResponse<any>> => {
  const response = await API.post("/request", contract);
  console.log("Response Contract", response)
  return response.data;
};

export const getContracts = async (providerId?: string | null, serviceId?: string | null, clientId?: string | null, status?: ContractStatus | null): Promise<ApiResponse<ContractModel[]>> => {
  const params: any = {};
  
  if (providerId) params.providerId = providerId;
  if (serviceId) params.serviceId = serviceId;
  if (clientId) params.clientId = clientId;
  if (status) params.status = status

  const response = await API.get("/", { params });
  
  return response.data;
};

export const updateStatus = async (contractId: string, status: ContractStatus): Promise<ApiResponse<any>> => {
  const response = await API.post(`/status/${contractId}?status=${status}`);
  console.log("Response Status Contract", response)
  return response.data;
};
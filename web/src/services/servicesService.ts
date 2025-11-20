import axios from "axios";
import { ApiResponse } from "../app/models/response";
import { ServiceCategory, ServiceModel, ServiceStatus } from "@/app/models/service";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/service", // URL del backend
});

export const registerService = async (service: ServiceModel): Promise<ApiResponse<any>> => {
  const response = await API.post("/register", service);
  console.log("Response Register", response)
  return response.data;
};

export const getServices = async (category?: ServiceCategory | null, status?: ServiceStatus | null, providerId?: string | null): Promise<ApiResponse<ServiceModel[]>> => {
  const params: any = {};
  
  if (category && category !== ServiceCategory.ALL) params.category = category;
  if (status && status !== ServiceStatus.ALL) params.status = status;
  if (providerId && providerId !== '') params.providerId = providerId;

  const response = await API.get("/", { params });
  
  return response.data;
};

export const updateService = async (serviceId: string, service: Partial<ServiceModel>): Promise<ApiResponse<any>> => {
  const response = await API.put(`/update/${serviceId}`, service);
  return response.data;
}

export async function updateServiceStatus(serviceId: string, status: ServiceStatus) {
  return API.post(`/status/${serviceId}`, { status });
}


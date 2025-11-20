import axios from "axios";
import { ApiResponse } from "../app/models/response";
import { ServiceModel } from "@/app/models/service";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/service", // URL del backend
});

export const registerService = async (service: ServiceModel): Promise<ApiResponse<any>> => {
  const response = await API.post("/register", service);
  console.log("Response Register", response)
  return response.data;
};
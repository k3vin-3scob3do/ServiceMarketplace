import { UserModel, UserRole, UserStatus } from "@/app/models/user";
import axios from "axios";
import { ApiResponse } from "../app/models/response";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/user", // URL del backend
});

export const registerUser = async (user: UserModel): Promise<ApiResponse<any>> => {
  const response = await API.post("/register", user);
  console.log("Response Register", response)
  return response.data;
};

export const getUsers = async (role?: UserRole | null, status?: UserStatus | null): Promise<ApiResponse<UserModel[]>> => {
  const params: any = {};
  
  if (role && role !== UserRole.ALL) params.role = role;
  if (status && status !== UserStatus.ALL) params.status = status;

  const response = await API.get("/", { params });
  
  return response.data;
};

export const getUser = async (userId: string): Promise<ApiResponse<UserModel>> => {
  const response = await API.get(`/${userId}`)
  console.log("Response getUser", response)
  return response.data
}

export const updateUser = async (userId: string, user: UserModel): Promise<ApiResponse<any>> => {
  const response = await API.put(`/update/${userId}`, user)
  console.log("Response updateUser", response)
  return response.data
}
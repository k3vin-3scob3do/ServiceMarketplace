import { LoginRequest, UserModel } from "@/app/models/user";
import axios from "axios";
import { ApiResponse } from "../app/models/response";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/auth", // URL del backend
});

export const login = async (user: LoginRequest): Promise<ApiResponse<UserModel>> => {
  const response = await API.post("/login", user);
  // console.log("Login", response)
  return response.data;
};
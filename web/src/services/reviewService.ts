// import { ReviewModel } from "@/app/models/review";

import { ApiResponse } from "@/app/models/response";
import { ReviewModel } from "@/app/models/review";
import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const createReview = async (review: ReviewModel) => {
//   try {
//     const response = await fetch(`${API_URL}/review/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(review),
//     });
//     return await response.json();
//   } catch (error) {
//     console.error("Error creating review:", error);
//     throw error;
//   }
// };

// export const getReviewsByService = async (service_id: string) => {
//   try {
//     const response = await fetch(`${API_URL}/review?service_id=${service_id}`);
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//     throw error;
//   }
// };

// export const getReviewsByUser = async (user_id: string) => {
//   try {
//     const response = await fetch(`${API_URL}/review?user_id=${user_id}`);
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Error fetching user reviews:", error);
//     throw error;
//   }
// };

// export const updateReview = async (review_id: string, review: ReviewModel) => {
//   try {
//     const response = await fetch(`${API_URL}/review/update/${review_id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(review),
//     });
//     return await response.json();
//   } catch (error) {
//     console.error("Error updating review:", error);
//     throw error;
//   }
// };

// export const deleteReview = async (review_id: string) => {
//   try {
//     const response = await fetch(`${API_URL}/review/delete/${review_id}`, {
//       method: "DELETE",
//     });
//     return await response.json();
//   } catch (error) {
//     console.error("Error deleting review:", error);
//     throw error;
//   }
// };


const API = axios.create({
  baseURL: "https://servicemarketplace-tfrl.onrender.com/review", // URL del backend
});

export const registerReview = async (review: ReviewModel): Promise<ApiResponse<any>> => {
  const response = await API.post("/register", review);
  console.log("Response Register Review", response)
  return response.data;
};

export const getReviews = async (serviceId?: string | null, userId?: string | null): Promise<ApiResponse<ReviewModel[]>> => {
  const params: any = {};
  
  if (serviceId) params.service_id = serviceId;
  if (userId) params.user_id = userId

  const response = await API.get("/", { params });
  
  return response.data;
};

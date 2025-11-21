export interface ReviewModel {
  _id?: string;
  service_id: string;
  user_id: string;
  user_name?: string;
  rating: number;
  comment?: string;
  created_at?: string;
}
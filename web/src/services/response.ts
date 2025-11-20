export interface ApiResponse<T> {
  intCode: number;
  strMessage: string;
  data: T;
}
export interface SuccessResponse<T> {
  status: true;
  statusCode: number;
  message: string;
  data: T;
}

export interface FailedResponse<T> {
  status: false;
  statusCode: number;
  message: string;
  error: T;
}

export type ApiResponse<T> = SuccessResponse<T> | FailedResponse<T>;

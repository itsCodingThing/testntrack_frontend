import { ApiResponse } from "@/types/response";

export class ApiError<T> extends Error {
  response: ApiResponse<T> | null;

  constructor(message: string, res?: ApiResponse<T>) {
    super(message);
    this.name = "ApiError";
    this.response = res ?? null;
  }
}

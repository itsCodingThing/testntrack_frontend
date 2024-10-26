import type { ApiResponse } from "@/types/response";
import ky, { HTTPError } from "ky";
import { auth } from "../auth";

const baseUrl = "http://localhost:8080/api/";
export const apiV1 = ky.create({
  prefixUrl: baseUrl,
  hooks: {
    beforeRequest: [
      async function setAuthToken(req) {
        const session = await auth();
        req.headers.set("Authorization", `Bearer ${session?.user.token ?? ""}`);
      },
    ],
  },
});

async function createResponse<T>(error: unknown): Promise<ApiResponse<T>> {
  if (error instanceof HTTPError) {
    try {
      const errorResponse = await error.response.json<ApiResponse<T>>();
      return errorResponse;
    } catch {
      return {
        status: false,
        statusCode: 500,
        message: "json parsing failed",
        data: "" as T
      };
    }
  }

  return {
    status: false,
    statusCode: 500,
    message: "something went wrong",
    data: "" as T
  };
}

export async function handleJsonApi<T>(
  cb: Promise<ApiResponse<T>>
): Promise<ApiResponse<T>> {
  try {
    return await cb;
  } catch (error) {
    return await createResponse(error);
  }
}

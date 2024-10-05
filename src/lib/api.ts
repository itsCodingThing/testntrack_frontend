"use server";

import { IAdmin } from "@/types/models/admin";
import type { ISchool } from "@/types/models/school";
import type { ApiResponse } from "@/types/response";
import ky, { HTTPError } from "ky";
import type { User } from "next-auth";
import { revalidatePath } from "next/cache";
import { auth } from "./auth";

const baseUrl = "http://localhost:8080/api/v1/";
const apiV1 = ky.create({
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
        error: "client error" as T,
      };
    }
  }

  return {
    status: false,
    statusCode: 500,
    message: "something went wrong",
    error: "client error" as T,
  };
}

async function handleJsonApi<T>(
  cb: Promise<ApiResponse<T>>,
): Promise<ApiResponse<T>> {
  try {
    return await cb;
  } catch (error) {
    return await createResponse(error);
  }
}

export async function adminLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await handleJsonApi(
    apiV1
      .post<
        ApiResponse<{ token: string; id: number; name: string } & User>
      >("auth/login", { json: { email, password, type: "admin" } })
      .json(),
  );

  return response;
}

export async function getAllAdmins() {
  const response = await handleJsonApi(
    apiV1.get<ApiResponse<IAdmin[]>>("admin").json(),
  );
  return response;
}

export async function getAdminById(id: number) {
  try {
    const response = await apiV1.get<ApiResponse<IAdmin>>(`admin/${id}`).json();
    return response;
  } catch (error) {
    return await createResponse(error);
  }
}

export async function createAdmin(payload: {
  name: string;
  email: string;
  contact: string;
  password: string;
}) {
  try {
    const response = await apiV1
      .post<ApiResponse<string>>("admin/create", { json: payload })
      .json();

    revalidatePath("/dashboard/admin");

    return response;
  } catch (error) {
    return await createResponse(error);
  }
}

export const removeAdmin = async (adminId: string) => {
  const response = await apiV1
    .delete<ApiResponse<string>>(`admin/${adminId}/remove`)
    .json();
  revalidatePath("/dashboard/admin");
  return response;
};

export const getSchools = async () => {
  const response = await apiV1.get<ApiResponse<ISchool[]>>("schools").json();
  return response;
};

export async function createSchool(payload: {
  name: string;
  email: string;
  contact: string;
  code: string;
}) {
  try {
    const response = await apiV1
      .post<
        ApiResponse<string>
      >("school/create", { json: { type: "school", ...payload } })
      .json();
    revalidatePath("/dashboard/school");
    return response;
  } catch (error) {
    return await createResponse(error);
  }
}

export const removeSchool = async (schoolId: string) => {
  const response = await apiV1
    .delete<ApiResponse<string>>(`school/${schoolId}/remove`)
    .json();
  return response;
};

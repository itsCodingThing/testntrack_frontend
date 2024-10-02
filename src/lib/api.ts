"use server";

import { IAdmin } from "@/types/models/admin";
import type { ISchool } from "@/types/models/school";
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

interface ApiResponse<T = string> {
  statusCode: number;
  message: string;
  data: T;
  status: boolean;
  error?: string;
}

class ApiError<T = string> extends Error {
  response: ApiResponse<T> | null;

  constructor(message: string, res?: ApiResponse<T>) {
    super(message);
    this.name = "ApiError";
    this.response = res ?? null;
  }

  static async defaultResponseError(error: unknown) {
    if (error instanceof HTTPError) {
      const errorResponse = await error.response.json<ApiResponse<string>>();
      return errorResponse;
    }

    return {
      statusCode: 500,
      message: "something went wrong",
      data: "",
      status: false,
      error: "",
    };
  }
}

export const adminLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await apiV1
    .post<
      ApiResponse<{ token: string } & User>
    >("auth/login", { json: { email, password, type: "admin" } })
    .json();

  return response;
};

export const getAllAdmins = async () => {
  const response = await apiV1.get<ApiResponse<IAdmin[]>>("admin").json();

  return response;
};

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
    return await ApiError.defaultResponseError(error);
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
    return await ApiError.defaultResponseError(error);
  }
}

export const removeSchool = async (schoolId: string) => {
  const response = await apiV1
    .delete<ApiResponse<string>>(`school/${schoolId}/remove`)
    .json();
  return response;
};

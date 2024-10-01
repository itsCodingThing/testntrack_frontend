import ky from "ky";
import type { User } from "next-auth";
import type { ISchool } from "@/types/models/school";
import { auth } from "./auth";
import { IAdmin } from "@/types/models/admin";

const baseUrl = "http://localhost:8080/api/v1/";
const apiV1 = ky.create({ prefixUrl: baseUrl });

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  status: boolean;
  error?: string;
}

export const authApi = {
  adminLogin: async ({
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
  },
};

export const adminApi = {
  getAllAdmins: async () => {
    const session = await auth();
    const response = await apiV1
      .get<
        ApiResponse<IAdmin[]>
      >("admin", { headers: { authorization: "Bearer " + session?.user.token } })
      .json();

    return response;
  },
};

export const schoolApi = {
  getSchools: async () => {
    const session = await auth();
    const response = await apiV1
      .get<
        ApiResponse<ISchool[]>
      >("schools", { headers: { authorization: "Bearer " + session?.user.token } })
      .json();
    return response;
  },
  createSchool: async (payload: {
    name: string;
    email: string;
    contact: string;
    code: string;
    type: string;
  }) => {
    const session = await auth();
    const response = await apiV1
      .post<
        ApiResponse<string>
      >("school/create", { headers: { authorization: "Bearer " + session?.user.token }, json: payload })
      .json();
    return response;
  },
};

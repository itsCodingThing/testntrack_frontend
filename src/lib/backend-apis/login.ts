import { ApiResponse } from "@/types/response";
import { User } from "next-auth";
import { handleJsonApi, apiV1 } from "./setup";

type AdminLoginParams = {
  type: "school" | "admin";
  email: string;
  password: string;
  code?: string;
};

export async function adminLogin(loginParams: AdminLoginParams) {
  type LoginResponse =
    | { type: "admin"; token: string; id: number; name: string }
    | {
        type: "school-admin";
        token: string;
        id: number;
        name: string;
        schoolName: string;
        schoolId: string;
      };

  const response = await handleJsonApi(
    apiV1
      .post<
        ApiResponse<LoginResponse & User>
      >("auth/login", { json: { ...loginParams } })
      .json()
  );

  return response;
}

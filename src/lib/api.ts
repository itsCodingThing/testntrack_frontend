import ky from "ky";
import type { User } from "next-auth";

const baseUrl = "http://localhost:8080/api/v1/";
const apiV1 = ky.create({ prefixUrl: baseUrl });

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  status: boolean;
  error?: string;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await apiV1
    .post<
      ApiResponse<{ token: string } & User>
    >("auth/login", { json: { email, password, type: "admin" } })
    .json();

  return response;
}

"use server";

import { Admin } from "@/types/models/admin";
import { ApiResponse } from "@/types/response";
import { revalidatePath } from "next/cache";
import { handleJsonApi, apiV1 } from "./setup";

export async function getAllAdmins(params?: { count: number; page: number }) {
  let url = "admin";
  const searchParams = new URLSearchParams();

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      searchParams.set(key, value.toString());
    }

    url = `${url}?${searchParams.toString()}`;
  }

  const response = await handleJsonApi(
    apiV1.get<ApiResponse<Admin[]>>(url).json()
  );

  return response;
}

export async function getAdminById(id: number) {
  const response = await handleJsonApi(
    apiV1.get<ApiResponse<Admin>>(`admin/${id}`).json()
  );
  return response;
}

export async function createAdmin(payload: {
  name: string;
  email: string;
  contact: string;
  password: string;
}) {
  const response = await handleJsonApi(
    apiV1.post<ApiResponse<string>>("admin/create", { json: payload }).json()
  );

  revalidatePath("/dashboard/admin");
  return response;
}

export async function removeAdmin(adminId: string) {
  const response = await apiV1
    .delete<ApiResponse<string>>(`admin/${adminId}/remove`)
    .json();

  revalidatePath("/admin");
  return response;
}

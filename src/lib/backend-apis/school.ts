import { ISchool } from "@/types/models/school";
import { ApiResponse } from "@/types/response";
import { revalidatePath } from "next/cache";
import { apiV1, handleJsonApi } from "./setup";

export const getAllSchools = async () => {
  const response = await apiV1.get<ApiResponse<ISchool[]>>("school").json();
  return response;
};

export async function createSchool(payload: {
  name: string;
  email: string;
  contact: string;
  code: string;
}) {
  const response = await handleJsonApi(
    apiV1
      .post<
        ApiResponse<string>
      >("school/create", { json: { type: "school", ...payload } })
      .json()
  );
  revalidatePath("/dashboard/school");
  return response;
}

export const removeSchool = async (schoolId: string) => {
  const response = await apiV1
    .delete<ApiResponse<string>>(`school/${schoolId}/remove`)
    .json();
  return response;
};

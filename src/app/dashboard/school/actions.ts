"use server";

import { schoolApi } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createSchool(data: FormData) {
  const schema = z.object({
    email: z.string(),
    name: z.string(),
    contact: z.string(),
    code: z.string(),
  });

  try {
    const validate = await schema.parseAsync({
      email: data.get("email"),
      name: data.get("name"),
      contact: data.get("contact"),
      code: data.get("code"),
    });

    await schoolApi.createSchool({
      type: "school",
      ...validate,
    });

    revalidatePath("/dashboard/school");
  } catch (error) {
    console.log("create school function error", error);
  }
}

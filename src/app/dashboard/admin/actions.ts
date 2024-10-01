"use server";

import { adminApi } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createAdmin(data: FormData) {
  const schema = z.object({
    email: z.string(),
    name: z.string(),
    contact: z.string(),
    password: z.string(),
  });

  try {
    const validate = await schema.parseAsync({
      email: data.get("email"),
      name: data.get("name"),
      contact: data.get("contact"),
      password: data.get("password"),
    });

    await adminApi.createAdmin(validate);

    revalidatePath("/dashboard/admin");
  } catch (error) {
    console.log("create school function error", error);
  }
}

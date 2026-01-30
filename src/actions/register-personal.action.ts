"use server";
import prisma from "@/lib/prisma";
import { PersonalFormState, PersonalSchema } from "@/schemas/personal.schema";
import z from "zod";

export async function registerPersonal(
  prevState: PersonalFormState,
  formData: FormData,
): Promise<PersonalFormState> {
  const fields = {
    nombreCompleto: formData.get("nombreCompleto")?.toString() || "",
  };

  const validateFields = PersonalSchema.safeParse(fields);

  if (!validateFields.success) {
    const flatterrors = z.flattenError(validateFields.error);

    return {
      status: false,
      data: prevState.data,
      errors: flatterrors.fieldErrors,
    };
  }

  await prisma.personal.create({
    data: {
      nombreCompleto: validateFields.data.nombreCompleto,
    },
  });

  return {
    status: true,
    data: fields,
  };
}

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
    personalId: formData.get("personalId")
      ? Number(formData.get("personalId"))
      : undefined,
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

  if (validateFields.data.personalId) {
    await prisma.personal.update({
      where: { personalId: validateFields.data.personalId },
      data: {
        nombreCompleto: validateFields.data.nombreCompleto,
      },
    });
  } else {
    await prisma.personal.create({
      data: {
        nombreCompleto: validateFields.data.nombreCompleto,
      },
    });
  }

  return {
    status: true,
    data: validateFields.data,
  };
}

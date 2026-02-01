"use server";
import prisma from "@/lib/prisma";
import { TodoFormState, TodoSchema } from "@/schemas/todo.schema";
import z from "zod";

export async function registerTodo(
  prevState: TodoFormState,
  formData: FormData,
): Promise<TodoFormState> {
  const fields = {
    tarea: formData.get("tarea")?.toString() || "",
    importancia: formData.get("importancia")?.toString() || "Baja",
    fechaInicio: formData.get("fechaInicio")
      ? new Date(formData.get("fechaInicio")!.toString())
      : undefined,
    fechaFin: formData.get("fechaFin")
      ? new Date(formData.get("fechaFin")!.toString())
      : undefined,
    tiempoEstimado: formData.get("tiempoEstimado")?.toString() || "",
    personalId: formData.get("personalId")
      ? Number(formData.get("personalId"))
      : -1,
    estado: formData.get("estado")?.toString() || "APROBADA",
  };

  const validateFields = TodoSchema.safeParse(fields);
  if (!validateFields.success) {
    const flatterrors = z.flattenError(validateFields.error);
    return {
      status: false,
      data: prevState.data,
      errors: flatterrors.fieldErrors,
    };
  }

  await prisma.todos.create({
    data: {
      tarea: validateFields.data.tarea,
      importancia: validateFields.data.importancia.toString(),
      fechaInicio: validateFields.data.fechaInicio!,
      estado: validateFields.data.estado,
      fechaFin: validateFields.data.fechaFin,
      personal: {
        connect: { personalId: validateFields.data.personalId },
      },
      tiempoEstimado: validateFields.data.tiempoEstimado,
    },
  });

  return {
    status: true,
    data: validateFields.data,
  };
}

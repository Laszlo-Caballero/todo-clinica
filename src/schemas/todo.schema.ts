import { EstadoEnum } from "@/generated/prisma-client/enums";
import { FormState } from "@/interface/types";
import z from "zod";

export const TodoSchema = z.object({
  tarea: z.string().min(3, "La tarea debe tener al menos 3 caracteres"),
  importancia: z.enum(["Baja", "Media", "Alta"]),
  fechaInicio: z.date().optional(),
  fechaFin: z.date().optional(),
  tiempoEstimado: z.string().optional(),
  personalId: z.number({
    error: "El ID del personal es obligatorio",
  }),
  estado: z.enum(EstadoEnum).default(EstadoEnum.APROBADA),
});

export type TodoType = z.infer<typeof TodoSchema>;
export type TodoFormState = FormState<TodoType>;

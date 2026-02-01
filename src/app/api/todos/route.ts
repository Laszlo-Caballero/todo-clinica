import { EstadoEnum } from "@/generated/prisma-client/enums";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const todos = await prisma.todos.findMany({
    include: {
      personal: true,
    },
  });

  return NextResponse.json(todos);
}

export type TodoResponse = {
  personal: {
    personalId: number;
    estado: boolean;
    fechaCreacion: Date;
    nombreCompleto: string;
  };
} & {
  todoId: number;
  tarea: string;
  importancia: string | null;
  fechaInicio: Date;
  tiempoEstimado: string | null;
  fechaFin: Date | null;
  personalId: number;
  estado: EstadoEnum;
  fechaCreacion: Date;
};

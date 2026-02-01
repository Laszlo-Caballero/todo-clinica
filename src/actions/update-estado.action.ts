"use server";

import { EstadoEnum } from "@/generated/prisma-client/enums";
import prisma from "@/lib/prisma";
export async function updateEstado(id: number, newEstado: EstadoEnum) {
  try {
    await prisma.todos.update({
      where: { todoId: id },
      data: { estado: newEstado },
    });
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}

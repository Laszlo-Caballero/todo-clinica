"use server";

import prisma from "@/lib/prisma";

export async function updateDate(
  id: number,
  date: Date,
  key: "fechaInicio" | "fechaFin",
) {
  try {
    await prisma.todos.update({
      where: { todoId: id },
      data: { [key]: date },
    });

    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
      error: (error as Error).message,
    };
  }
}

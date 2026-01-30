import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const todos = await prisma.todos.findMany({
    include: {
      personal: true,
    },
  });

  console.log("Fetched todos:", todos);

  return NextResponse.json(todos);
}

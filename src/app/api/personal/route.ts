import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const personal = await prisma.personal.findMany();
  return NextResponse.json(personal);
}

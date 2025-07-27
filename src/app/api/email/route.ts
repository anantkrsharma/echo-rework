import prismaClient from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const existing = await prismaClient.waitlistEmail.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ exists: true }, { status: 200 });
  }

  await prismaClient.waitlistEmail.create({ data: { email } });
  return NextResponse.json({ exists: false, added: true }, { status: 201 });
}
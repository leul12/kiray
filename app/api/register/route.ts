import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prsimadb";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    emal,
    name,
    password,
   } = body;

   const hashedPassword = await bcrypt.hash(password, 12);

   const user = await prisma.user.create({
    data: {
      emal,
      name,
      hashedPassword,
    }
  });

  return NextResponse.json(user);
}
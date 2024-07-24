import prisma from "@/module/_global/bin/prisma";
import { Login } from "@/types/auth/login";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email }: Login = await req.json();
  const user = await prisma.user.findUnique({
    where: { email, isActive: true },
    select: { id: true, phone: true },
  });

  if (!user) {
    return Response.json({
      success: false,
      message: "Email atau Password salah",
    });
  }

  return Response.json({
    success: true,
    message: "Login Berhasil",
    phone: user.phone,
    id: user.id,
  });
}
